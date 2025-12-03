import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { MenuService } from 'src/app/services/menu.service';
import { saveAs } from "file-saver";
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { PadraoComboFiltro } from 'src/app/models/padrao-combo-filtro/padrao-combo-filtro';
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { Session } from 'src/app/pages/home/guards/session';
import { BancoModel } from 'src/app/models/usuario/BancoModel';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { CriptografiaService } from 'src/app/services/criptografia.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent implements OnInit {

  @Input() home: boolean = false;
  private readonly baseUrlPortalBase = environment["endPointPortalBase"];

  constructor(public router: Router, public menuService: MenuService, private downloadArquivoService: DownloadArquivoService, private authService: AuthService,
    private translate: TranslateService, public filtroService: FiltroGlobalService,
    private session: Session,
    private userService: LoginService,
    private criptografiaService: CriptografiaService

  ) {
    // this.router.events.subscribe((event) => {
    //   translate.setDefaultLang('por');
    //   this.translate.use('por');
    // });
  }

  userADM: boolean = false;
  filtroMobileAtivo: boolean = false;

  ngOnInit(): void {
    // this.ListPortalDisponivel();
    var user = this.session.getUserSession();
    if (user)
      this.userADM = user.CodUserPerfil == 1;

    // this.ListPortalDisponivel();

  }

  selecionaMenu(menu: number) {
    this.menuService.activeMenu = menu;
    this.menuService.menuSelecao = menu.toString();

    // if (menu == 1) {
    //   this.menuService.nomePage = this.translate.instant('navbar.dashboard-one');
    //   this.router.navigate(['/dashboard-one']);
    // }

      if (menu == 100) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-usuario');
      this.router.navigate(['/usuario']);
    }



    if (menu == 2) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-two');
      this.router.navigate(['/dashboard-awareness']);
    }

    if (menu == 3) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-three');
      this.router.navigate(['/dashboard-funil']);
    }

    if (menu == 8) {
      this.redefineFiltroSemDenominators();

      // this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao)
      //   .subscribe((response: Array<PadraoComboFiltro>) => {


      this.menuService.nomePage = this.translate.instant('navbar.dashboard-eight');
      this.router.navigate(['/dashboard-consideration']);

      // this.filtroService.listaMarcas = response;
      // this.filtroService.ModelMarcas = response[0];

      // }, (error) => console.error(error),
      //   () => {
      //   }
      // )

    }



    if (menu == 4) {
      // this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-four');
      this.router.navigate(['/dashboard-imagem-pura']);
      // this.redefineFiltroSemDenominators();
    }

    if (menu == 5) {
      //  this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-five');
      this.router.navigate(['/dashboard-posicionamento-marca']);
      //  this.redefineFiltroSemDenominators();
    }

    if (menu == 6) {
      // this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-six');
      this.router.navigate(['/dashboard-brand-creator']);
      // this.redefineFiltroSemDenominators();
    }

    if (menu == 7) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-seven');
      this.router.navigate(['/dashboard-comunicacao']);
      // this.redefineFiltroSemDenominators();
    }

    if (menu == 8) {
      this.redefineFiltroSemDenominators();

      this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao)
        .subscribe((response: Array<PadraoComboFiltro>) => {

          this.menuService.nomePage = this.translate.instant('navbar.dashboard-eight');
          this.router.navigate(['/dashboard-consideration']);

          this.filtroService.listaMarcas = response;
          this.filtroService.ModelMarcas = response[0];

        }, (error) => console.error(error),
          () => {
          }
        )

    }


    if (menu == 9) {
      this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-nine');
      this.router.navigate(['/dashboard-adhoc-section']);
      this.redefineFiltroSemDenominators();
    }
  }


  redefineFiltroSemDenominators() {

    if (this.filtroService.listaTarget) {
      this.filtroService.ModelTarget = this.filtroService.listaTarget[0];
    }

    if (this.filtroService.listaDenominators)
      this.filtroService.ModelDenominators = this.filtroService.listaDenominators[0];

  }

  FiltroMarcas() {

    this.filtroService.FiltroOnda()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaOnda = response;
        this.filtroService.ModelOnda = response[0];

        // this.filtroService.FiltroRegiao()
        // .subscribe((response: Array<PadraoComboFiltro>) => {
        //   this.filtroService.listaRegiao = response;
        //   // this.filtroService.ModelRegiao = response[0];

        this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao)
          .subscribe((response: Array<PadraoComboFiltro>) => {

            this.filtroService.listaMarcas = response;
            this.filtroService.ModelMarcas = response[0];

          }, (error) => console.error(error),
            () => {
            }
          )

        // }, (error) => console.error(error),
        //   () => {
        //   }
        // )



      }, (error) => console.error(error),
        () => {
        }
      )


  }




  closeMenu() {
    var el = document.getElementById("menu-mobile");
    if (el)
      el.classList.remove("active");
  }

  abrirMenuMobile(e: Event) {
    var el = document.getElementById('menu-mobile')
    if (el) {
      el.classList.add('active')
      el.classList.add('clicouabrirmenu')
    }


    if (this.filtroMobileAtivo) {
      this.filtroMobileAtivo = false;
      var el = document.getElementById('global-filter')
      if (el != null)
        el.classList.add('filter-close')
    }

  }


  listAcessos: Array<BancoModel>;
  usuarioModel: UsuarioModel;

  ListPortalDisponivel() {

    var user = this.session.getUserSession();

    if (user) {
      this.usuarioModel = new UsuarioModel();
      this.usuarioModel.CodUser = user.CodUser;
      this.userService.ListPortalDisponivel(this.usuarioModel).subscribe(
        response => {
          this.listAcessos = response;
          this.authService.setAcessosUser(response);
        },
        err => {
          console.log(err);
        },
        () => {

        }
      );
    }
    else {
      this.alertUserLogin();
    }

  }


  alertUserLogin() {
    alert("você precisa fazer o login novamente");
    console.log("Não encontrado permissão usuário");
    this.sairPortal();
  }


  sairPortal() {
    this.authService.limparDadosUsuario();
    // this.router.navigate(['/login']);
    this.router.navigate(['/login']);
  }


  retornarNestleMenu() {


    var user = this.session.getUserSession();

    if (user) {

      var infoEncrypt = this.criptografiaService.execEncrypt(user.CodUser.toString());
      if (infoEncrypt) {

        const url = `${this.baseUrlPortalBase}/#/login?crypt=${infoEncrypt}`;
        window.location.href = url;
      }
      else {
        console.log("Não foi possivel redirecionar")
      }

    }
    else {

      this.authService.limparDadosUsuario();
      window.location.href = this.baseUrlPortalBase + "/#/login";
    }
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

}
