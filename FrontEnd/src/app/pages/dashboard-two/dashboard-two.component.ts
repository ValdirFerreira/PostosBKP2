import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as Highcharts from 'highcharts';
import { FiltroPadrao, FiltroPadraoExcel } from 'src/app/models/Filtros/FiltroPadrao';
import { saveAs } from "file-saver";
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { DashBoardTwoService } from 'src/app/services/dashboard-two.service';
import { TranslateService } from '@ngx-translate/core';
import { ConversorPowerpointService } from 'src/app/services/conversor-powerpoint.service';
import { AuthService } from 'src/app/services/auth.service';
import { Session } from '../home/guards/session';
import { PadraoComboFiltro } from 'src/app/models/padrao-combo-filtro/padrao-combo-filtro';
import { LogService } from 'src/app/services/log.service';



@Component({
    selector: 'app-dashboard-two',
    templateUrl: './dashboard-two.component.html',
    styleUrls: ['./dashboard-two.component.scss'],
    standalone: false
})
export class DashboardTwoComponent implements OnInit {
o

  subscription: any;



  constructor(public router: Router,
    public menuService: MenuService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService, private dashBoardTwoService: DashBoardTwoService,
    private translate: TranslateService, private conversorPowerpointService: ConversorPowerpointService,
    private authService: AuthService,
    private session: Session,
    private logService: LogService,

  ) { }



  ngOnInit(): void {



    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.menuService.nomePage = this.translate.instant('navbar.dashboard-two');
    this.menuService.activeMenu = 2;
    this.menuService.menuSelecao = "2"

    this.subscription = EventEmitterService.get("emit-dashboard-two").subscribe((x) => {



      this.logService.GravaLogRota(this.router.url).subscribe(
      );
    })


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  




}
