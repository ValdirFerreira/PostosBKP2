import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FiltroPadrao } from 'src/app/models/Filtros/FiltroPadrao';
import { PadraoComboFiltro } from 'src/app/models/padrao-combo-filtro/padrao-combo-filtro';
import { PopupMsn } from 'src/app/models/PopupMsn/PopupMsn';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';
import { Session } from 'src/app/pages/home/guards/session';

import { AuthService } from 'src/app/services/auth.service';
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  @Input('titulo') tituloPagina: string;
  @Input() pageAtual: string;
  @Input() home: boolean = false;
  filtro: boolean = false;


  alertaAtivo: boolean = false;
  checkedtourChecked = false;
  mensagem: string = "";

  constructor(public router: Router,
    private authService: AuthService, public filtroService: FiltroGlobalService,
    public menuService: MenuService, private loginService: LoginService, private session: Session,
  ) { }

  mesAnoAtualizado: string;

  filtroMobile: boolean = false;

  open = false;

  // --- propriedades
openMenu: number | null = null;


// --- utilitário: limpa recursivamente Ativo
clearAllActive(items: MenuItem[]) {
  items.forEach(i => {
    i.Ativo = false;
    if (i.Children && i.Children.length) {
      this.clearAllActive(i.Children);
    }
  });
}

// --- selecionar apenas o menu pai (abre/fecha)
selectParent(menu: MenuItem) {
  // limpa todos (pais e filhos)
  this.clearAllActive(this.menus);

  // marca somente o pai clicado
  menu.Ativo = true;

  // abre/fecha dropdown
  this.openMenu = this.openMenu === menu.Id ? null : menu.Id;

  // se o próprio pai tem Url (é também um link), navega
  if (menu.Url) {
    this.router.navigate([menu.Url]);
    this.openMenu = null; // fecha após navegação, se preferir
  }
}

// --- selecionar um filho: marca o pai e o filho, navega e fecha
selectChild(parent: MenuItem, child: MenuItem) {
  this.clearAllActive(this.menus);

  // marca pai e filho
  parent.Ativo = true;
  child.Ativo = true;

  // fecha dropdown
  this.openMenu = null;

  // navega
  if (child.Url) {
    this.router.navigate([child.Url]);
  }
}

// --- opcional: marcar com base na rota atual ao iniciar (mantém ativo após reload)
ngOnInit() {
  const current = this.router.url; // por exemplo '/proprietario'
  this.clearAllActive(this.menus);

  for (const m of this.menus) {
    if (m.Url === current) {
      m.Ativo = true;
      break;
    }

    if (m.Children && m.Children.length) {
      for (const c of m.Children) {
        if (c.Url === current) {
          m.Ativo = true; // pai ativo
          c.Ativo = true; // filho ativo
          break;
        }
      }
    }
  }
}



goTo(url: string) {
  this.router.navigate([url]);
  this.openMenu = null;
}


menus: MenuItem[] = [
  {
    Id: 1,
    Nome: 'Home',
    Url: '/home',
    Ordem: 0,
   
   
  },
  {
    Id: 1,
    Nome: 'Dashboard',
    Url: '/dashboard',
    Ordem: 1,
   
  },
  {
    Id: 2,
    Nome: 'Cadastro Usuário',
    Ordem: 2,
    Children: [
      {
        Id: 21,
        Nome: 'Cadastrar Proprietário',
        Url: '/proprietario',
        Ordem: 1
      },
      {
        Id: 22,
        Nome: 'Cadastrar Entrevistador',
        Url: '/cadastro-entrevistador',
        Ordem: 2
      }
    ]
  },
 
];



  sairPortal() {
    this.authService.UsuarioAutenticado(false);
    this.router.navigate(['/loginIpsos']);
  }


}


export class MenuItem {
  Id: number;
  Nome: string;
  Url?: string;
  Icone?: string;
  Role?: string[];
  Ativo?: boolean;
  Ordem?: number;
  Children?: MenuItem[];
}




