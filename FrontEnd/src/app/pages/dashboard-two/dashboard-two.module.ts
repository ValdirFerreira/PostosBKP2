import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FiltroGlobalModule } from 'src/app/components/filtroGlobal/filtro-global.module';
import { AvisoSemDadosModule } from 'src/app/components/aviso-sem-dados/aviso-sem-dados.module';


import { FooterBottomModule } from 'src/app/components/footer-bottom/footer-bottom.module';
import { DashboardTwoRoutingModule } from './dashboard-two-routing.module';
import { DashboardTwoComponent } from './dashboard-two.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  // providers: [
  //   { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting, solidgauge, wordcloud, treemap] } // add as factory to your providers
  // ],
  declarations: [
    DashboardTwoComponent,

  ],
  imports: [
    CommonModule,
    DashboardTwoRoutingModule,
    SidebarModule,
    NavbarModule,
    AvisoSemDadosModule,
    // ChartModule,
    FooterBottomModule,
   
    TranslateModule,
   
  ]
})
export class DashboardTwoModule { }
