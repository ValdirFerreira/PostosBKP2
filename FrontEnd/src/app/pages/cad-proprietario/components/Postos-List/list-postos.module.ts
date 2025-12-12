import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FiltroGlobalModule } from 'src/app/components/filtroGlobal/filtro-global.module';
import { AvisoSemDadosModule } from 'src/app/components/aviso-sem-dados/aviso-sem-dados.module';

// import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as solidgauge from 'highcharts/modules/solid-gauge.src';
import * as wordcloud from 'highcharts/modules/wordcloud.src';
import * as treemap from 'highcharts/modules/treemap.src';
import * as data from 'highcharts/modules/data.src';

import { FooterBottomModule } from 'src/app/components/footer-bottom/footer-bottom.module';
import { ListPostosComponent } from './list-postos.component';

import { TranslateModule } from '@ngx-translate/core';
import { SidebarPortaisModule } from 'src/app/components/sidebar-portais/sidebar-portais.module';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  // providers: [
  //   { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting, solidgauge, wordcloud, treemap] } // add as factory to your providers
  // ],
  declarations: [
    ListPostosComponent,

  ],
  imports: [
    CommonModule,
    SidebarModule,
    SidebarPortaisModule,
    NavbarModule,
    AvisoSemDadosModule,
    // ChartModule,
    FooterBottomModule,
    TranslateModule,
    FormsModule,
    NgxFileDropModule,

  ],
  exports:[ListPostosComponent]
})
export class ListPostosModule { }
