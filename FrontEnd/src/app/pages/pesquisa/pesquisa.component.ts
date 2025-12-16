import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { PesquisaService } from 'src/app/services/pesquisa.service';
import { PesquisaRequest, PesquisaRespostaCadastrarRequest, PesquisaVerificaRespostaRequest } from 'src/app/models/PesquisaModel/PesquisaModel';



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
  ) { }


  ngOnInit(): void {

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

  step: number = 1;
  totalSteps: number = 4;

  options: string[] = [
    'Todos os dias',
    'Algumas vezes por semana',
    'Uma vez por semana',
    'Poucas vezes no mês',
    'Raramente'
  ];

  selectedOption: string | null = null;

  // Selecionar opção
  onSelect(option: string) {
    this.selectedOption = option;
  }

  scaleQuestions = [
    { title: 'Qualidade do atendimento da equipe', name: 'atendimento' },
    { title: 'Qualidade do combustível', name: 'combustivel' },
    { title: 'Limpeza e organização deste posto', name: 'limpeza' },
    { title: 'Segurança deste posto', name: 'seguranca' },
    { title: 'Você recomendaria este posto?', name: 'recomendacao' }
  ];

  firstRow = [1, 2, 3, 4, 5];
  secondRow = [6, 7, 8, 9, 10];

  answers: { [key: string]: number } = {};

  selectValue(key: string, value: number) {
    this.answers[key] = value;
    console.log(this.answers);
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

  validarDocumento() {
    console.log('Validar documento: ' + this.Documento);


    let model = new PesquisaVerificaRespostaRequest();
    model.ParamDocumento = this.Documento;
    this.service.VerificarPesquisaResposta(model).subscribe({
      next: (res) => {
        if (res.PassagemCliente == 1) {
          this.pesquisaPassoAlertas = 0;
          this.pesquisaPasso = 3;
        }
        else {
          this.pesquisaPassoAlertas = 3;


          let model = new PesquisaRequest();
          model.ParamCodIdioma=1;
          model.ParamCodSegmento=1;
          this.service.ConsultarPesquisaQuestoes(model).subscribe({
            next: (res) => {

            },
            error: (err) => {
              console.error("Erro ao cadastrar proprietário:", err);
            }
          });

        }
      },
      error: (err) => {
        console.error("Erro ao cadastrar proprietário:", err);
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


  voltarPesquisa() {
    this.pesquisaPassoAlertas = 0;
  }


}