import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { PesquisaService } from 'src/app/services/pesquisa.service';
import { PesquisaQuestaoListagemResponse, PesquisaQuestaoOpcaoResponse, PesquisaRequest, PesquisaRespostaCadastrarRequest, PesquisaVerificaRespostaRequest } from 'src/app/models/PesquisaModel/PesquisaModel';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss'],
  standalone: false
})
export class PesquisaComponent implements OnInit {

  constructor(public router: Router,
    public menuService: MenuService,
    private translate: TranslateService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService,
    public service: PesquisaService,
    public dialog: MatDialog,
    public downloadService: DownloadService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  idpostoSelecionado: number = 0;

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      var idposto = params['idposto'];

      if (idposto) {
        this.idpostoSelecionado = idposto;
      }
    });
  }

  @Output() begin = new EventEmitter<void>();

  startSurvey() {
    this.begin.emit();
    console.log('Iniciar pesquisa');
  }

  pesquisaPasso: number = 1;
  pesquisaPassoAlertas: number = 0;

  ativarPesquisa(value: number) {
    this.pesquisaPasso = value;
  }

  selectedOption: string | null = null;

  // Selecionar opção
  onSelect(option: string) {
    this.selectedOption = option;
  }

  // Voltar uma etapa
  goBack() {
    if (this.step > 1) {
      this.step--;
    }
  }

  // Avançar etapa
  goNext() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }

  // Fechar popup ou componente
  close() {
    console.log('Fechar questionário');
    // implemente aqui: fechar modal, navegar, etc
  }

  ConsultarPesquisaQuestoes(model: PesquisaRequest) {
    this.service.ConsultarPesquisaQuestoes(model).subscribe({
      next: (res) => {


      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
  }

  VerificarPesquisaResposta(model: PesquisaVerificaRespostaRequest) {
    this.service.VerificarPesquisaResposta(model).subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
  }

  CadastrarPesquisaResposta(model: PesquisaRespostaCadastrarRequest) {
    this.service.CadastrarPesquisaResposta(model).subscribe({
      next: (res) => {


      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
  }

  Documento: string = "";
  cpfInvalidoBTN = false;
  onCPFInput(event: any) {
    let valor = event.target.value;

    // Remove absolutamente tudo que não é número
    valor = valor.replace(/\D/g, "");

    // Limita a 11 dígitos (CPF sem máscara)
    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    // Aplica a máscara
    this.Documento = this.formatarCPF(valor);

    if (!this.Documento || this.Documento.replace(/\D/g, '').length != 11) {
      this.cpfInvalidoBTN = false;
       this.cpfInvalido = true;
    }
    else{
       this.cpfInvalidoBTN = true;
        this.cpfInvalido = false;
    }

    return this.Documento;
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

  listQuestions: PesquisaQuestaoListagemResponse[] = [];
  questaoAtual!: PesquisaQuestaoListagemResponse;
  indiceQuestao = 0;

  step = 1;
  totalSteps = 4; // ou listQuestions.length

  opcaoSelecionada!: PesquisaQuestaoOpcaoResponse;

  opcoesSelecionadas: PesquisaQuestaoOpcaoResponse[] = [];

  isOpcaoSelecionada(opcao: any): boolean {

    // this.opcaoSelecionada = this.opcoesSelecionadas.find(x =>
    //   x.CodVariavel === opcao.CodVariavel && x.Opcao === opcao.Opcao
    // )!;


    return this.opcoesSelecionadas
      .some(x => x.CodVariavel === opcao.CodVariavel && x.Opcao === opcao.Opcao);
  }

  onSelecionarOpcao(opcao: PesquisaQuestaoOpcaoResponse): void {

    
    // Guarda a opção atual selecionada
    this.opcaoSelecionada = opcao;

    // Procura no array se já existe
    const index = this.opcoesSelecionadas.findIndex(x =>
      x.CodVariavel === opcao.CodVariavel
    );

    if (index > -1) {
      // Atualiza o objeto existente
      this.opcoesSelecionadas[index] = { ...opcao };
    } else {
      // Adiciona novo objeto
      this.opcoesSelecionadas.push({ ...opcao });
    }
    
    console.log('Selecionada:', this.opcaoSelecionada);
    console.log('Array:', this.opcoesSelecionadas);
  }

  cpfInvalido = false;

  validarDocumento() {
    console.log('Validar documento: ' + this.Documento);

    if (!this.Documento || this.Documento.replace(/\D/g, '').length != 11) {
      this.cpfInvalido = true;
      return;
    }

    let model = new PesquisaVerificaRespostaRequest();
    model.ParamDocumento = this.Documento.replace(/\D/g, '');

    this.service.VerificarPesquisaResposta(model).subscribe({
      next: (res) => {
        // if (res.PassagemCliente == 1) {
        //   this.pesquisaPassoAlertas = 0;
        //   this.pesquisaPasso = 3;
        // }
        // else {
        //   this.pesquisaPassoAlertas = 3;


        //   let model = new PesquisaRequest();
        //   model.ParamCodIdioma = 1;
        //   model.ParamCodSegmento = 1;
        //   this.service.ConsultarPesquisaQuestoes(model).subscribe({
        //     next: (res) => {
        //       this.listQuestions = res;
        //     },
        //     error: (err) => {
        //       console.error("Erro ao cadastrar proprietário:", err);
        //     }
        //   });

        // }

        // 🔴 JÁ RESPONDEU
        if (res.PassagemCliente == 0) {
          this.pesquisaPassoAlertas = 3;
          this.pesquisaPasso = 999; // tela de aviso
          return;
        }

        // 🟢 NÃO RESPONDEU → inicia pesquisa


        this.carregarQuestoes();

      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
      }
    });
  }

  carregarQuestoes() {
    let model = new PesquisaRequest();
    model.CodIdioma = 1;
    model.CodSegmento = 1;
    
    this.service.ConsultarPesquisaQuestoes(model).subscribe({
      next: (res) => {
        this.listQuestions = res;

        

        if (this.listQuestions.length > 0) {
          this.indiceQuestao = 0;
          this.step = 1;
          this.pesquisaPassoAlertas = 0;
          this.pesquisaPasso = 3;
          this.carregarQuestaoAtual();
          this.processarDescricao();
        }
      },
      error: (err) => {
        console.error("Erro ao consultar questões:", err);
      }
    });
  }

  carregarQuestaoAtual() {
    
    this.questaoAtual = this.listQuestions[this.indiceQuestao];
    this.opcaoSelecionada = null!;
  }

  voltarPesquisa() {
    this.pesquisaPassoAlertas = 0;
  }


  baixarTermo() {
  const link = document.createElement('a');
  link.href = 'assets/Files/Proposta Postos_dashboards_v3.pptx';
  link.download = 'Proposta Postos_dashboards_v3.pptx';
  link.click();
}

  abilitaPesquisa: boolean = true;
  prosseguir() {

    this.opcaoSelecionada = this.opcoesSelecionadas[this.indiceQuestao];

    
    if (!this.opcaoSelecionada) {
      return;
    }

    this.abilitaPesquisa = false;
    console.log({
      CodQuestao: this.questaoAtual.CodPesquisaListagemQuestao,
      CodVariavel: this.opcaoSelecionada
    });

    this.processarDescricao()

    if (this.indiceQuestao < this.listQuestions.length - 1) {
      this.indiceQuestao++;
      this.step++;
      this.carregarQuestaoAtual(); // ✅ CORRETO
        this.processarDescricao()
    } else {
      this.finalizarPesquisa();
    }

    setTimeout(() => {
      this.abilitaPesquisa = true;
    }, 500);

  }




  voltar() {
    if (this.indiceQuestao > 0) {
      this.indiceQuestao--;
      this.step--;
      this.carregarQuestaoAtual(); // ✅
        this.processarDescricao()
    }
  }

  finalizarPesquisa() {
    console.log('Pesquisa finalizada');

    let respostas = this.opcoesSelecionadas
      .map(x => x.Opcao)
      .join(',') + ',';

    let model = new PesquisaRespostaCadastrarRequest();
    model.ParamRespostas = respostas;
    model.ParamCodSegmento = 1;
    model.ParamClienteDocumento = this.Documento.replace(/\D/g, '')
    model.ParamCodPosto = this.idpostoSelecionado;

    this.service.CadastrarPesquisaResposta(model).subscribe({
      next: (res) => {
        if (res.CodCliente <= 0) {
          this.pesquisaPassoAlertas = 999; // erro
        }
        else {
          this.pesquisaPasso = 999;  // tela de agradecimento
          this.pesquisaPassoAlertas = 4;
        }
      },
      error: (err) => {
        console.error("Erro ao consultar questões:", err);
      }
    });

  }

  fechar() {
    this.pesquisaPassoAlertas = 1;
  }

  sairPesquisa() {
    // lógica para sair da pesquisa
    // ex: this.router.navigate(['/home']);
    this.pesquisaPassoAlertas = 2;
    this.Documento = "";
  }

  respostasSelecionadas: string[] = [];
  indiceQuestaoAtual = 0;



  temLink = false;
  linkEncontrado = '';
  textoSemLink = '';

  // ngOnInit() {
  //   this.processarDescricao();
  // }

  mostrarFrame = false;

  processarDescricao() {
    const descricao = this.questaoAtual?.Descricao || '';

    const regexUrl = /(https?:\/\/[^\s]+)/g;
    const match = descricao.match(regexUrl);

    if (match) {
      this.temLink = true;
      this.linkEncontrado = match[0];
      this.textoSemLink = descricao.replace(match[0], '').trim();
    } else {
      this.temLink = false;
      this.textoSemLink = descricao;
    }
  }

  onCliqueLinkClose() {
    this.mostrarFrame = false;
  }

  onCliqueLink() {
    this.linkSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.linkEncontrado.replace('.pdf.', '.pdf')
    );

    this.mostrarFrame = true;
  }

  linkSeguro!: SafeResourceUrl;






}