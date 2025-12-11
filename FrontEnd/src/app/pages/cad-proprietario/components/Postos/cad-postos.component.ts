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
  selector: 'cad-postos',
  templateUrl: './cad-postos.component.html',
  styleUrls: ['./cad-postos.component.scss'],
  standalone: false
})
export class CadPostosComponent implements OnInit {


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
    // const abaFiltro = this.abaAtiva === 'ativo' ? 1 : 2;
    // const q = this.pesquisa.trim().toLowerCase();

    // let list = this.allData.filter(x => x.CodStatus === abaFiltro);

    // if (this.filtroSelecionado !== 'Todos') {
    //   // exemplo: caso queira filtrar por posição ou outro critério
    //   list = list.filter(x => x.Funcao === this.filtroSelecionado);
    // }

    // if (q) {
    //   list = list.filter(x =>
    //     x.Nome.toLowerCase().includes(q) ||
    //     x.Funcao.toLowerCase().includes(q) ||
    //     x.Email.toLowerCase().includes(q)
    //   );
    // }

    // return list;

    return this.allData;
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
    this.service.consultarFuncionarios(1).subscribe({
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
    // this.active == 'proprietario';
    // this.service.ProprietarioConsultarPeloID(ID).subscribe({
    //   next: (res) => {
    //     let item = res[0];
    //     let mapModel = new ProprietarioCadastrarRequest();
    //     mapModel.Cod = item.Cod;
    //     mapModel.Documento = "000"
    //     mapModel.Email = item.Email;
    //     mapModel.Nome = item.Nome;
    //     mapModel.Status = item.CodStatus;
    //     mapModel.Telefone = "0000;"

    //     this.model = mapModel;




    //     this.activeCadastro = true;
    //   }
    // });
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

  model = new Proprietario();

  cancelar() {
    console.log('Cadastro cancelado');
    this.OpenModalCancelar();
  }

  salvarPosto() {

    this.modelPosto; // dados Posto
    this.servicosDisponiveis; // Serviços
    this.allData; // funcionarios

    // console.log('Dados enviados:', this.model);
    // const model = this.model;
    // if (!this.validarCamposObrigatorios()) {
    //   return; // interrompe fluxo
    // }

    // this.service.cadastrarProprietario(model).subscribe({
    //   next: (res) => {
    //     debugger

    //     if (res.Cod == 0) {
    //       const mensagensErro: string[] = [];
    //       mensagensErro.push(res.Info)
    //       this.OpenModalErro(mensagensErro);
    //     }
    //     else {

    //       debugger
    //       const dialogRef = this.dialog.open(DialogDynamicComponent);

    //       dialogRef.componentInstance.typeDialog = 1;
    //       dialogRef.afterClosed().subscribe(result => {
    //         console.log("RESULTADO RECEBIDO:", result);

    //         // window.location.reload();
    //         console.log("Proprietário cadastrado com sucesso! Novo ID:", res.Cod);

    //       });
    //     }
    //   },
    //   error: (err) => {
    //     console.error("Erro ao cadastrar proprietário:", err);
    //   }
    // });
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

  changeAssPosto(value: boolean, cod: any) {

    this.activeAssPosto = value
    this.activeCadastro = false;
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

  ////////////////////////////////////////////
  //CADASTRO FUNCIONARIOS

  activeCadFuncionario: string = 'dados';

  cadFuncionarioActive: boolean = false;

  changeCadFuncionario(value: boolean) {
    this.cadFuncionarioActive = value;
  }

  cancelarDadastroFuncionario() {
    this.changeCadFuncionario(false)
  }

  salvarFuncionario() {

    debugger
    if (!this.validarCamposObrigatorios()) {
      return; // interrompe fluxo
    }

    debugger
    const req = this.model;



    let contem = this.allData.filter(x => x.Email === req.Email);

    if (contem.length > 0) {
      const dialogRef = this.dialog.open(DialogDynamicComponent);
      dialogRef.componentInstance.typeDialog = 5;
      dialogRef.afterClosed().subscribe(result => {
        console.log("RESULTADO RECEBIDO:", result);

      });
    }
    else {

      debugger
      const novo: Proprietario = {
        Cod: this.allData.length + 1,
        Nome: req.Nome,
        Documento: req.Documento,
        CodStatus: req.CodStatus,
        DescricaoStatus: this.getDescricaoStatus(req.CodStatus), // opcional
        Funcao: req.Funcao ? req.Funcao : "Não Informado",
        Telefone: req.Telefone,
        Email: req.Email
      };
      debugger
      this.allData.push(novo);
      this.currentPage = 1;

      this.activeCadFuncionario = 'dados';

      this.changeCadFuncionario(false)

      this.model = new Proprietario();
    }

  }

  changeDelete(email: any) {

    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 4;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

      if (result?.ok) {

        this.allData = this.allData.filter(x => x.Email !== email);

        //  const index = this.allData.findIndex(x => x.Email === email);

        //   if (index !== -1) {
        //     this.allData.splice(index, 1);
        //   }
      }
    });

  }

  getDescricaoStatus(status: number): string {
    switch (status) {
      case 1: return 'Ativo';
      case 2: return 'Inativo';
      default: return 'Não informado';
    }
  }

  active: string = 'proprietario';

  validarCamposObrigatorios() {
    const mensagensErro: string[] = [];
    const model = this.model;

    // Nome
    if (!model.Nome || model.Nome.trim() === "") {
      mensagensErro.push("O campo Nome é obrigatório.");
    }

    // // Documento
    // if (!model.Documento || model.Documento.trim() === "") {
    //   mensagensErro.push("O campo Documento é obrigatório.");
    // }

    // Status (se for número e obrigatório)
    if (model.CodStatus === null || model.CodStatus === undefined) {
      mensagensErro.push("O campo Status é obrigatório.");
    }

    // // Telefone
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

}
