import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TranslateService } from '@ngx-translate/core';
import { PainelPostosService } from 'src/app/services/painel-postos.service';
import { Proprietario } from 'src/app/models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest } from 'src/app/models/PainelPostos/ProprietarioCadastrarRequest';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDynamicComponent } from 'src/app/components/dialog-dynamic/dialog-dynamic.component';
import { MatDialog } from '@angular/material/dialog';
import { PostoModel, ServicoCategoria } from 'src/app/models/PainelPostos/PostoModel';
import { DownloadService } from 'src/app/services/download.service';
import { FilePostos } from 'src/app/models/PainelPostos/FilePostos';



@Component({
  selector: 'cad-proprietario',
  templateUrl: './cad-proprietario.component.html',
  styleUrls: ['./cad-proprietario.component.scss'],
  standalone: false
})
export class CadProprietarioComponent implements OnInit {


  constructor(public router: Router,
    public menuService: MenuService,
    private translate: TranslateService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService,
    public service: PainelPostosService,
    public dialog: MatDialog,
    public downloadService: DownloadService,
  ) { }


  // estado da tela
  abaAtiva: 'ativo' | 'inativo' = 'ativo';
  pesquisa: string = '';
  filtroSelecionado: string = 'Todos';

  // paginação
  pageSize = 6;            // linhas por página (ajuste conforme necessidade)
  currentPage = 1;


  ngOnInit(): void {
    this.resetPagination();
  }


  // retorna a lista filtrada por aba (ativo/inativo), pesquisa e filtro adicional
  get filteredList(): Proprietario[] {
    const abaFiltro = this.abaAtiva === 'ativo' ? 1 : 2;
    const q = this.pesquisa.trim().toLowerCase();

    let list = this.allData.filter(x => x.CodStatus === abaFiltro);

    if (this.filtroSelecionado !== 'Todos') {
      // exemplo: caso queira filtrar por posição ou outro critério
      list = list.filter(x => x.Funcao === this.filtroSelecionado);
    }

    if (q) {
      list = list.filter(x =>
        x.Nome.toLowerCase().includes(q) ||
        x.Funcao.toLowerCase().includes(q) ||
        x.Email.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // lista paginada presente na tela
  get pagedList(): Proprietario[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  // quantas páginas existem na lista atual
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
  }

  // constrói array de páginas para render
  get pages(): number[] {
    const total = this.totalPages;
    const pages: number[] = [];
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  // trocar aba e resetar paginação para 1
  trocarAba(aba: 'ativo' | 'inativo') {
    this.abaAtiva = aba;
    this.resetPagination();
  }

  // ao digitar pesquisa
  onPesquisar() {
    this.resetPagination();
  }

  // navegação de pagina
  goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    // caso queira manter foco ou scroll para topo da tabela, pode implementar aqui
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }



  allData: Array<Proprietario> = [];

  // utilitário para resetar paginação quando lista muda
  private resetPagination() {
    this.service.consultarProprietarios(1).subscribe({
      next: (res) => {
        this.allData = res;

      }
    });

    this.currentPage = 1;
  }

  // Ações de exemplo (editar / remover / ver)
  editar(item: Proprietario) {
    console.log('editar', item);
    // abrir modal / rota de edição
  }

  remover(item: Proprietario) {
    console.log('remover', item);
    // lógica para remover (mock: apenas log)
  }

  ver(item: Proprietario) {
    console.log('ver', item);
    // abrir detalhes
  }


  ///////////////////////////////////////////////////////////////////////////////////
  // Edição 
  ///////////////////////////////////////////////////////////////////////////////////
  ProprietarioConsultarPeloID(ID) {
    this.active == 'proprietario';
    this.service.ProprietarioConsultarPeloID(ID).subscribe({
      next: (res) => {
        let item = res[0];
        let mapModel = new ProprietarioCadastrarRequest();
        mapModel.Cod = item.Cod;

        mapModel.Email = item.Email;
        mapModel.Nome = item.Nome;
        mapModel.Status = item.CodStatus;

        mapModel.Documento = this.validCPF(item.Documento);
        mapModel.Telefone = this.validTelefone(item.Telefone);

        this.model = mapModel;

        var fileSend = new FilePostos();

        fileSend.Cod = item.Cod;
        fileSend.FileBase64 = "carregar";
        fileSend.NomeArquivo = "Contrato";

        this.service.RecuperaArquivo(fileSend).subscribe({
          next: (res) => {
            debugger

            var file = this.base64ToFile(res.FileBase64, "Contrato");
            this.files.push(file);

          },
          error: (err) => {
            console.error("Erro file proprietário:", err);
          }
        });



        this.activeCadastro = true;
      }
    });
  }


  validCPF(valor: string): string {
    let v = this.limparMascara(valor);

    if (v.length <= 11) {
      // CPF -> 000.000.000-00
      return v
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    } else {
      // CNPJ -> 00.000.000/0000-00
      return v
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
    }
  }

  validTelefone(valor: string): string {
    let v = this.limparMascara(valor);

    if (v.length <= 10) {
      // fixo -> (00) 0000-0000
      return v
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^(\(\d{2}\)\s)(\d{4})(\d)/, "$1$2-$3");
    } else {
      // celular -> (00) 00000-0000
      return v
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/^(\(\d{2}\)\s)(\d{5})(\d)/, "$1$2-$3");
    }
  }

  private limparMascara(valor: string | null | undefined): string {
    if (!valor) return '';
    return valor.replace(/\D/g, ''); // remove tudo que não é número
  }

  base64ToFile(base64: string, fileName: string, contentType?: string): File {
    // Remove prefixo "data:xxx;base64,"
    const arr = base64.split(',');
    const base64String = arr.length > 1 ? arr[1] : arr[0];

    // Descobre o MIME type se não enviado
    if (!contentType && arr[0].includes("data:")) {
      contentType = arr[0].split(':')[1].split(';')[0];
    }

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new File([byteArray], fileName, { type: contentType || 'application/octet-stream' });
  }

  baixarArquivo(cod: number) {

    var fileSend = new FilePostos();

    fileSend.Cod = cod;
    fileSend.FileBase64 = "carregar";
    fileSend.NomeArquivo = "Contrato";

    this.service.RecuperaArquivo(fileSend).subscribe({
      next: (res) => {
        debugger

        return this.downloadService.downloadFileFromBase64(res.FileBase64, "Contrato.PDF");

      },
      error: (err) => {
        console.error("Erro file proprietário:", err);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Cadastro 
  ///////////////////////////////////////////////////////////////////////////////////

  activeCadastro: boolean = false;

  changeCadastro(value: boolean) {
    this.model.Cod = 0;
    this.activeCadastro = value
  }


  form = {
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    status: 'Ativo'
  };

  goBack() {
    this.activeCadastro = false;
  }

  model = new ProprietarioCadastrarRequest();

  cancelar() {
    console.log('Cadastro cancelado');
    this.OpenModalCancelar();
  }

  salvar() {
    console.log('Dados enviados:', this.model);
    this.salvarProprietario();
  }


  NextContato() {
    this.active = 'contato';
  }

  AvancarContato() {
    this.active = 'upload';
  }

  active: string = 'proprietario';


  validarCamposObrigatorios() {
    const mensagensErro: string[] = [];
    const model = this.model;

    // Nome
    if (!model.Nome || model.Nome.trim() === "") {
      mensagensErro.push("O campo Nome é obrigatório.");
    }

    // Documento
    // if (!model.Documento || model.Documento.trim() === "") {
    //   mensagensErro.push("O campo Documento é obrigatório.");
    // }

    // Status (se for número e obrigatório)
    if (model.Status === null || model.Status === undefined) {
      mensagensErro.push("O campo Status é obrigatório.");
    }

    // Telefone
    if (!model.Telefone || model.Telefone.trim() === "") {
      mensagensErro.push("O campo Telefone é obrigatório.");
    }

    // Email
    if (!model.Email || model.Email.trim() === "") {
      mensagensErro.push("O campo Email é obrigatório.");
    }


    if (!this.files || this.files.length <= 0) {
      mensagensErro.push("O contrato é obrigatório.");
    }

    // 👉 Se houver erros, abrir popup de erro
    if (mensagensErro.length > 0) {
      this.OpenModalErro(mensagensErro);
      return false;
    }

    return true; // tudo OK
  }

  salvarProprietario() {
    const model = this.model;


    if (!this.validarCamposObrigatorios()) {
      return; // interrompe fluxo
    }

    this.service.cadastrarProprietario(model).subscribe({
      next: (res) => {
        debugger

        if (res.Cod == 0) {
          const mensagensErro: string[] = [];
          mensagensErro.push(res.Info)
          this.OpenModalErro(mensagensErro);
        }
        else {

          debugger
          const dialogRef = this.dialog.open(DialogDynamicComponent);

          dialogRef.componentInstance.typeDialog = 1;
          dialogRef.afterClosed().subscribe(result => {
            console.log("RESULTADO RECEBIDO:", result);

            this.salveFile(res.Cod);

            // this.reloadPage();
            console.log("Proprietário cadastrado com sucesso! Novo ID:", res.Cod);

          });
        }
      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
  }

  salveFile(Cod: number) {
    debugger
    if (this.files.length > 0) {

      let selectedFile = this.files[0];

      var fileSend = new FilePostos();

      this.downloadService.convertFileToBase64(selectedFile).then((base64String) => {

        fileSend.FileBase64 = base64String;
        fileSend.NomeArquivo = selectedFile.name;
        fileSend.Cod = Cod;



        this.service.cadastrarFileProprietario(fileSend).subscribe({
          next: (res) => {
            debugger
            if (!res) {
              const mensagensErro: string[] = [];
              mensagensErro.push("Erro no salvamente do arquivo!")
              this.OpenModalErro(mensagensErro);
            }
            else {
              this.reloadPage();
            }

          },
          error: (err) => {
            console.error("Erro ao cadastrar proprietário:", err);
          }
        });

      })

    }


  }


reloadPage() {
  const currentUrl = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}


  onCPFInput(event: any) {
    let valor = event.target.value;

    // Remove absolutamente tudo que não é número
    valor = valor.replace(/\D/g, "");

    // Limita a 11 dígitos (CPF sem máscara)
    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    // Aplica a máscara
    this.model.Documento = this.formatarCPF(valor);

    return this.model.Documento;
  }

  formatarCPF(valor: string): string {
    // 3.333.333-33
    if (valor.length > 9) {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    }
    if (valor.length > 6) {
      return valor.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    }
    if (valor.length > 3) {
      return valor.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    return valor;
  }

  onTelefoneInput(event: any) {
    let value = event.target.value;

    // Remove tudo que NÃO for número
    value = value.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + número)
    value = value.substring(0, 11);

    // Aplica máscara automaticamente
    if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      value = value.replace(/(\d{0,2})/, "($1");
    }

    this.model.Telefone = value;
    event.target.value = value;

    return value;
  }

  onEmailInput(event: any) {
    let value = event.target.value;

    // Remove espaços
    value = value.replace(/\s/g, "");

    // Permitir apenas caracteres válidos de e-mail
    value = value.replace(/[^a-zA-Z0-9@._-]/g, "");

    // Não permitir múltiplos @
    const parts = value.split("@");
    if (parts.length > 2) {
      value = parts[0] + "@" + parts.slice(1).join("").replace(/@/g, "");
    }

    this.model.Email = value;
    event.target.value = value;
  }

  validarEmail(email: string): boolean {
    if (!email) return false;

    // Regex simples e eficiente
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  }

bloquearNaoNumeros(event: KeyboardEvent) {
  const teclasPermitidas = [
    'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
  ];

  // Permite teclas de navegação
  if (teclasPermitidas.includes(event.key)) return;

  // ✅ PERMITE COLAR (Ctrl+V / Cmd+V)
  if (event.ctrlKey || event.metaKey) return;

  // Bloqueia se não for número
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}


baixarTermo() {
  const link = document.createElement('a');
  link.href = 'assets/Files/TERMO-PARCERIA-POSTOS.pdf';
  link.download = 'TERMO-PARCERIA-POSTOS.pdf';
  link.click();
}



  //////////////////////////////////////////////
  // files
  //////////////////////////////////////////////


  descricaoEvidencia: string;
  public files: File[] = [];
  filevalid: boolean = false;
  erro: boolean = false;
  liberaSelecaoLinhas: boolean;

  imagemArq(extArq: any): string {
    let extensao = extArq.name.toString().split('.').pop();

    // Caminho das imagens dentro da pasta 'publish'
    const basePath = './icones/';

    switch (extensao) {
      case 'txt':
        return `${basePath}txt-icon.png`;
      case 'xlsx':
        return `${basePath}icon-excel.png`;
      case 'xls':
        return `${basePath}xls.png`;
      case 'pdf':
        return `${basePath}pdf-icon.png`;
      case 'ppt':
        return `${basePath}ppt-icon.png`;
      case 'docx':
      //return// `${basePath}word-icon.png`;
      default:
        return `${basePath}arq-padrao-icon.png`;
    }
  }

  closeArq(indexArq: any) {
    //console.log(indexArq, 'arquivo a ser excluido');
    //console.log(this.files, 'Arquivos na lista')
    this.files.splice(indexArq, 1);
    //console.log(this.files, 'Arquivos na lista após remoção')
    this.descricaoEvidencia = "";
  }

  public fileOver(event: Event) {
    //console.log(event);
  }

  public fileLeave(event: Event) {
    //console.log(event);
  }

  isFileAllowed(fileName: string) {
    return true;
    // let isFileAllowed = false;
    // let allowedFiles;

    // allowedFiles = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xlsx', '.xls', '.xlsm'];

    // const regex = /(?:\.([^.]+))?$/;
    // const extension = regex.exec(fileName);
    // if (undefined !== extension && null !== extension) {
    //   for (const ext of allowedFiles) {
    //     if (ext === extension[0]) {
    //       isFileAllowed = true;
    //     }
    //   }
    // }
    // return isFileAllowed;
  }

  public dropped(files: NgxFileDropEntry[]) {

    this.erro = false;
    var onlyOneFileVideo = true;

    if (this.files.length > 0 || files.length > 1) {
      this.filevalid = true;
      return;
    }

    this.filevalid = false;

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile && this.isFileAllowed(droppedFile.fileEntry.name)) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          //console.log(droppedFile.relativePath, file);
          this.files.push(file);

          this.checkTypeFile(file.name);

          this.descricaoEvidencia = file.name;

          // this.limitaNome(file.name);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

      }

    }
  }

  checkTypeFile(name: string) {

    this.liberaSelecaoLinhas = true;
    // this.liberaSelecaoLinhas = false;

    // let extensao = name.toString().split('.').pop();
    // switch (extensao) {
    //   case 'xlsx':
    //   case 'xls':
    //   case 'xlsm':
    //     this.liberaSelecaoLinhas = true;
    //     break;
    //   // case 'doc':
    //   // case 'docx':
    //   //   return 2;

    //   default:
    //     this.liberaSelecaoLinhas = false;
    //     break;
    // }
  }

  OpenModalCancelar() {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 0;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

      if (result?.cancel) {
        this.reloadPage();
      }
    });

  }

  OpenModalErro(mensagensErro: string[]) {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.mensagensErro = mensagensErro;

    dialogRef.componentInstance.typeDialog = 999;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

    });
  }



  OpenModalDesativarProprietario(id: number) {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 2;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);
      if (result?.inativar) {

        let model = new ProprietarioCadastrarRequest();

        model.Cod = id;
        model.Status = 2; // Inativa  

        this.service.cadastrarProprietario(model).subscribe({
          next: (res) => {
            debugger

            if (res.Cod == 0) {
              const mensagensErro: string[] = [];
              mensagensErro.push(res.Info)
              this.OpenModalErro(mensagensErro);
            }
            else {

              this.reloadPage();

              // debugger
              // const dialogRef = this.dialog.open(DialogDynamicComponent);

              // dialogRef.componentInstance.typeDialog = 1;
              // dialogRef.afterClosed().subscribe(result => {
              //   console.log("RESULTADO RECEBIDO:", result);



              //   // this.reloadPage();
              //   console.log("Proprietário cadastrado com sucesso! Novo ID:", res.Cod);

              // });
            }
          },
          error: (err) => {
            console.error("Erro ao cadastrar proprietário:", err);
          }
        });
      }
    });

  }


  OpenModalReativarProprietario(id: number) {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 3;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);
      if (result?.inativar) {

        let model = new ProprietarioCadastrarRequest();

        model.Cod = id;
        model.Status = 1; // Ativa 

        this.service.cadastrarProprietario(model).subscribe({
          next: (res) => {
            debugger

            if (res.Cod == 0) {
              const mensagensErro: string[] = [];
              mensagensErro.push(res.Info)
              this.OpenModalErro(mensagensErro);
            }
            else {

              this.reloadPage();

              // debugger
              // const dialogRef = this.dialog.open(DialogDynamicComponent);

              // dialogRef.componentInstance.typeDialog = 1;
              // dialogRef.afterClosed().subscribe(result => {
              //   console.log("RESULTADO RECEBIDO:", result);



              //   // this.reloadPage();
              //   console.log("Proprietário cadastrado com sucesso! Novo ID:", res.Cod);

              // });
            }
          },
          error: (err) => {
            console.error("Erro ao cadastrar proprietário:", err);
          }
        });

      }
    });

  }





  ///////////////////////////////////////////////////////////
  //ASSOCIAÇÃO DE POSTOS
  ///////////////////////////////////////////////////////////
  modelPosto = new PostoModel();
  activePosto: string = 'postos';

  cargos: string[] = [
    "Gerente",
    "Frentista",
    "Supervisor",
    "Atendente",
    "Administrador",
    "Coordenador"
  ];

  activeAssPosto: boolean = false;

  IdProprietario: number = 0;
  NomeProprietario: string = "";

  changeAssPosto(value: boolean, cod: any, nome: any) {

    this.activeAssPosto = value
    this.activeCadastro = false;

    this.IdProprietario = cod;
    this.NomeProprietario = nome;
  }


  /////////////////////////////////////////////////////
  // SERVICOS
  /////////////////////////////////////////////////////




  public servicosDisponiveis: ServicoCategoria[] = [
    {
      titulo: "Abastecimento",
      descricao: "Lorem ipsum dolor sit amet consectetur morbi a consectetur senectus metus nunc sapien.",
      opcoes: [
        { nome: "Abastecimento", ativo: true },
        { nome: "Bomba de ar", ativo: false },
        { nome: "Gôndolas de fluidos", ativo: false }
      ]
    },
    {
      titulo: "Serviços adicionais",
      descricao: "Lorem ipsum dolor sit amet consectetur morbi a consectetur senectus metus nunc sapien.",
      opcoes: [
        { nome: "Troca de óleo", ativo: true },
        { nome: "Mecânica automotiva", ativo: false },
        { nome: "Lavagem", ativo: false }
      ]
    },
    {
      titulo: "Lojas e estabelecimentos",
      descricao: "Lorem ipsum dolor sit amet consectetur morbi a consectetur senectus metus nunc sapien.",
      opcoes: [
        { nome: "Conveniência", ativo: true },
        { nome: "Restaurante", ativo: true },
        { nome: "Lojas", ativo: true }
      ]
    }
  ];

}
