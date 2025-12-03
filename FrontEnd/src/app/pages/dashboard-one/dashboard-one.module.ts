import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { DashboardOneComponent } from './dashboard-one.component';
import { DashboardOneRoutingModule } from './dashboard-one-routing.module';
import { FooterBottomModule } from 'src/app/components/footer-bottom/footer-bottom.module';
import { AvisoSemDadosModule } from 'src/app/components/aviso-sem-dados/aviso-sem-dados.module';



@NgModule({
  declarations: [
    DashboardOneComponent,
  ],
  imports: [
    CommonModule,
    DashboardOneRoutingModule,
    SidebarModule,
    NavbarModule,
    AvisoSemDadosModule,
    FooterBottomModule
  ]
})
export class DashboardOneModule { }
