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
import { LoginService } from 'src/app/services/login.service';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';
import { BancoModel } from 'src/app/models/usuario/BancoModel';

import { AES } from 'crypto-js';
import { enc } from 'crypto-js';
import { Session } from 'src/app/pages/home/guards/session';
import { environment } from 'src/environments/environment';
import { CriptografiaService } from 'src/app/services/criptografia.service';

@Component({
    selector: 'sidebar-portais',
    templateUrl: './sidebar-portais.component.html',
    styleUrls: ['./sidebar-portais.component.scss'],
    standalone: false
})
export class SidebarPortaisComponent implements OnInit {

  @Input() home: boolean = false;
  // private readonly baseUrlendPointPortalNestleFormulaInfantil = environment["endPointPortalChocolate"];

  constructor(public router: Router, public menuService: MenuService,
    private downloadArquivoService: DownloadArquivoService, private authService: AuthService,
    private translate: TranslateService, public filtroService: FiltroGlobalService,
    private userService: LoginService,
    private session: Session,
    private criptografiaService: CriptografiaService
  ) {
    // this.router.events.subscribe((event) => {
    //   translate.setDefaultLang('por');
    //   this.translate.use('por');
    // });
  }

  filtroMobileAtivo: boolean = false;
  listAcessos: Array<BancoModel>;
  usuarioModel: UsuarioModel;

  ngOnInit(): void {
    this.ListPortalDisponivel();
  }

  selecionaMenu(menu: number) {
    this.menuService.activeMenu = menu;
    this.menuService.menuSelecao = menu.toString();


    // if (menu == 1) {
    //   this.menuService.nomePage = this.translate.instant('navbar.dashboard-one');
    //   this.router.navigate(['/dashboard-one']);
    // }

    if (menu == 2) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-two');
      this.router.navigate(['/dashboard-awareness']);
    }

    if (menu == 3) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-three');
      this.router.navigate(['/dashboard-funil']);
    }

    if (menu == 4) {
      this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-four');
      this.router.navigate(['/dashboard-imagem-pura']);
      this.redefineFiltroSemDenominators();
    }

    if (menu == 5) {
      this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-five');
      this.router.navigate(['/dashboard-posicionamento-marca']);
      this.redefineFiltroSemDenominators();
    }

    if (menu == 6) {
      this.FiltroMarcas();
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-six');
      this.router.navigate(['/dashboard-brand-creator']);
      this.redefineFiltroSemDenominators();
    }

    if (menu == 7) {
      this.menuService.nomePage = this.translate.instant('navbar.dashboard-seven');
      this.router.navigate(['/dashboard-comunicacao']);
      this.redefineFiltroSemDenominators();
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
    if (this.filtroService.listaDenominators)
      this.filtroService.ModelDenominators = this.filtroService.listaDenominators[0];
  }

  FiltroMarcas() {
    this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao)
      .subscribe((response: Array<PadraoComboFiltro>) => {

        this.filtroService.listaMarcas = response;
        this.filtroService.ModelMarcas = response[0];

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

  openPortalSelect(codPortal: number) {

    
    if (!this.usuarioModel) {
      this.alertUserLogin();
    }

    // switch (codPortal) {
    //   case 1:
    //     this.menuService.nomePage = this.translate.instant('navbar.dashboard-two');
    //     this.router.navigate(['/dashboard-awareness']);
    //     break;

    //   case 2:
    //     debugger
    //     var infoEncrypt = this.criptografiaService.execEncrypt(this.usuarioModel.CodUser.toString());
    //     if (infoEncrypt) {
    //       debugger
    //       const url = `${this.baseUrlendPointPortalNestleFormulaInfantil}?crypt=${infoEncrypt}`;
    //       window.location.href = url;
    //     }
    //     else {
    //       console.log("Não foi possivel redirecionar")
    //     }
    //     break;

    //   default:
    //     break;
    // }

    // debugger

    // const mensagem = 'Olá, mundo!';
    // const senha = 'senha-secreta';

    // const textoCriptografado = AES.encrypt(mensagem, senha).toString();
    // console.log(textoCriptografado);

    // const textoDescriptografado = AES.decrypt(textoCriptografado, senha).toString(enc.Utf8);
    // console.log(textoDescriptografado);

  }

  alertUserLogin() {
    alert("você precisa fazer o login novamente");
    this.sairPortal();
  }

  sairPortal() {
    this.authService.limparDadosUsuario();
    this.router.navigate(['/login']);
  }


}
