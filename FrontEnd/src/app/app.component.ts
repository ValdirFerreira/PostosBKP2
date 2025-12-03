import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FiltroGlobalService } from './services/filtro-global.service';

import { AuthService } from './services/auth.service';
import { Session } from './pages/home/guards/session';
import moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'Postos';
checkUserLogged: any;
  

objAlert!: {
    message: string;
    blnShowButton: boolean;
    blnShowAlert: boolean;
  };

 


  constructor(
    public translate: TranslateService,
    private router: Router,
    private filtroGlobalService: FiltroGlobalService,
    private authService: AuthService,
    private session: Session,
  ) {


    this.router.events.subscribe((event) => {
      translate.setDefaultLang('por');
      this.translate.use('por');
    });

  }

  ngOnInit() {


   //var usuario = this.session.getSession();
   this.objAlert = {
      message: '',
      blnShowButton: true,
      blnShowAlert: false,
    }


    setTimeout(() => { this.callCheckUserLogged(); }, 200);
    this.checkUserLogged = setInterval(() => this.callCheckUserLogged(), 3000);

    this.router.events.subscribe((e) => {
      let ne = e as NavigationEnd;
      const arrNotUpdate = ['/', '/login'];

  
      if (ne != null && ne.url != null && !arrNotUpdate.includes(ne.url)) {
   
        this.callUpdateToken(false);
      }
    });
  }

  callCheckUserLogged() {
    if (this.router.url != '/' && !this.router.url.toLowerCase().includes('/login')) {
      let dtExpires = moment(this.filtroGlobalService.DtExpires);
      let dtNow = moment();
      let duration = dtExpires.diff(dtNow, 'seconds')

      if (duration <= 0) {
        this.objAlert.blnShowAlert = false;
        this.sairPortal();
      }
      else if (duration <= 300) {
        let min = duration <= 60 ? 1 : Math.round(duration / 60);

        let descMinuto = " minuto(s)";
        if (min <= 1)
        descMinuto = " minuto"

          this.objAlert.message = `Estarás desconectado en menos de ${min} ${descMinuto}!`;
        this.objAlert.blnShowButton = true;
        this.objAlert.blnShowAlert = true;
      }
    }
  }

  callUpdateToken(blnShowMessage: boolean) {
    this.filtroGlobalService.DtExpires = moment().add(30, 'minutes').format();

    if (blnShowMessage) {
      this.objAlert.message = 'Token actualizado exitosamente.';
      this.objAlert.blnShowButton = false;
      this.objAlert.blnShowAlert = true;

      setTimeout(() => {
        this.objAlert.blnShowAlert = false;
      }, 1500);
    }
    else {
      this.objAlert.message = '';
      this.objAlert.blnShowAlert = false;
    }
  }



  sairPortal() {
    this.authService.limparDadosUsuario();
    this.router.navigate(['/login']);
  }


}


