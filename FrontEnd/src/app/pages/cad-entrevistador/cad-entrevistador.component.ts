import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TranslateService } from '@ngx-translate/core';
import { Proprietario } from 'src/app/models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest } from 'src/app/models/PainelPostos/ProprietarioCadastrarRequest';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDynamicComponent } from 'src/app/components/dialog-dynamic/dialog-dynamic.component';
import { MatDialog } from '@angular/material/dialog';
import { PostoModel, ServicoCategoria } from 'src/app/models/PainelPostos/PostoModel';
import { DownloadService } from 'src/app/services/download.service';
import { FilePostos } from 'src/app/models/PainelPostos/FilePostos';
import { EntrevistadorService } from 'src/app/services/entrevistador.service';



@Component({
  selector: 'cad-entrevistador',
  templateUrl: './cad-entrevistador.component.html',
  styleUrls: ['./cad-entrevistador.component.scss'],
  standalone: false
})
export class CadEntrevistadorComponent implements OnInit {


  constructor(public router: Router,
    public menuService: MenuService,
    private translate: TranslateService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService,
    public service: EntrevistadorService,
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
    this.service.EntrevistadorConsultarPeloID(ID).subscribe({
      next: (res) => {
        let item = res[0];
        let mapModel = new ProprietarioCadastrarRequest();
        mapModel.Cod = item.Cod;

        mapModel.Email = item.Email;
        mapModel.Nome = item.Nome;
        mapModel.Status = item.CodStatus;

        // mapModel.Documento = this.validCPF(item.Documento);
        // mapModel.Telefone = this.validTelefone(item.Telefone);

        this.model = mapModel;


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
    const model = this.model;


    if (!this.validarCamposObrigatorios()) {
      return; // interrompe fluxo
    }

    model.Documento = ""
    model.Telefone = ""

    this.service.cadastrarEntrevistador(model).subscribe({
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



            window.location.reload();
            console.log("Proprietário cadastrado com sucesso! Novo ID:", res.Cod);

          });
        }
      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
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
    // if (!model.Telefone || model.Telefone.trim() === "") {
    //   mensagensErro.push("O campo Telefone é obrigatório.");
    // }

    // Email
    if (!model.Email || model.Email.trim() === "") {
      mensagensErro.push("O campo Email é obrigatório.");
    }




    // 👉 Se houver erros, abrir popup de erro
    if (mensagensErro.length > 0) {
      this.OpenModalErro(mensagensErro);
      return false;
    }

    return true; // tudo OK
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

    // Permite teclas de navegação e edição
    if (teclasPermitidas.includes(event.key)) return;

    // Bloqueia se não for número
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }
  }

  OpenModalCancelar() {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 0;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

      if (result?.cancel) {
        window.location.reload();
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
    dialogRef.componentInstance.typeDialog = 6;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);
      if (result?.inativar) {

        let model = new ProprietarioCadastrarRequest();

        model.Cod = id;
        model.Status = 2; // Inativa  

        this.service.ExcluirEntrevistador(id).subscribe({
          next: (res) => {
            debugger

            window.location.reload();
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

        this.service.cadastrarEntrevistador(model).subscribe({
          next: (res) => {
            debugger

            if (res.Cod == 0) {
              const mensagensErro: string[] = [];
              mensagensErro.push(res.Info)
              this.OpenModalErro(mensagensErro);
            }
            else {

              window.location.reload();

              // debugger
              // const dialogRef = this.dialog.open(DialogDynamicComponent);

              // dialogRef.componentInstance.typeDialog = 1;
              // dialogRef.afterClosed().subscribe(result => {
              //   console.log("RESULTADO RECEBIDO:", result);



              //   // window.location.reload();
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
  //Cadastro
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

  activeEntrevistador: boolean = false;

  changeAssPosto(value: boolean, cod: any) {
    this.activeEntrevistador = value
    this.activeCadastro = false;
  }


}
