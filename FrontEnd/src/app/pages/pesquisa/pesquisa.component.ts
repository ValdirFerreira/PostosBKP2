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
    public service: PainelPostosService,
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

  pesquisa: boolean = false;

  ativarPesquisa(value: boolean) {
    this.pesquisa = value;
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


}