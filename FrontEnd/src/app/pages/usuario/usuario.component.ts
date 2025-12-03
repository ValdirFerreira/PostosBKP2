import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';


import { TipoUsuario } from 'src/app/models/usuario/tipoUsuario';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';
import { AuthService } from 'src/app/services/auth.service';

import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { Session } from '../home/guards/session';
import { BancoModel } from 'src/app/models/usuario/BancoModel';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  standalone: false
})
export class UsuarioComponent implements OnInit {

  constructor(private userService: LoginService,
    private authService: AuthService, private router: Router,
    public menuService: MenuService,
    private translate: TranslateService,

    private session: Session,
    public filtroService: FiltroGlobalService,) { }

  dataUsers: any = [];
  filteredUsers: any[] = []; // lista filtrada que será exibida
  unSubscribe;
  disable = true;
  searchText: string = '';
  p;


  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  // 1 - Tela Listagem
  // 2 - Criação
  tipoTela: number = 1;

  valorNomeUser: string = "";
  valorEmailUser: string = "";
  valorSenhaUser: string = "";
  valorIdUser: number = 0;
  NumeroJob: string = "";

  acessoBMR: number = 0;
  acessoVolumetria: number = 0;

  tipoUserModel: TipoUsuario;
  listatipoUserModel: Array<TipoUsuario>;

  tipoAtivoModel: TipoUsuario;
  listatipoAtivoModelModel: Array<TipoUsuario>;


  validEmail: boolean = false;
  validSenha: boolean = false;
  validNome: boolean = false;
  validNumeroJob: boolean = false;
  validPortais: boolean = false;
  validPais: boolean = false;

  graficoMonitorAtivo: boolean = false;

  dataBancoModel: Array<BancoModel>;

  dataSelectBancoModel: Array<BancoModel>;

  ngOnInit(): void {
    // var PERMITE_ACESSO = this.authService.verificaPermissao();
    // if (!PERMITE_ACESSO) {
    //   this.router.navigateByUrl("/principal");
    // }


    this.menuService.nomePage = this.translate.instant('navbar.dashboard-usuario');
    this.menuService.activeMenu = 10;
    this.menuService.menuSelecao = "10"

    this.ListarUsuarios();
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();
    // this.ListBancos();

  }



  novoUsuario() {
    this.tipoTela = 2;
    this.limparTelaCadastro();
    this.acessoBMR = 0;
    this.acessoVolumetria = 0;
    this.dataSelectBancoModel = Array<BancoModel>();
  }

  cancelar() {
    this.tipoTela = 1;
    this.limparTela();
    this.ListarUsuarios();
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();
    // this.ListBancos();
  }

  salvar() {

    this.validPortais = false;

    if (!this.valorNomeUser) {
      this.validNome = true;
    }
    else {
      this.validNome = false;
    }

    if (!this.valorEmailUser) {
      this.validEmail = true;
    }
    else {
      this.validEmail = false;
    }






    // Cadastrar Tipo 2
    if (this.tipoTela == 2) {

      if (this.valorNomeUser && this.valorEmailUser) {

        var usuarioModel = new UsuarioModel();
        usuarioModel.FlagAtivo = true;
        usuarioModel.Email = this.valorEmailUser;
        usuarioModel.Password = this.valorSenhaUser;
        usuarioModel.Name = this.valorNomeUser;
        usuarioModel.CodUserPerfil = this.tipoUserModel.CodUserPerfil;
        // usuarioModel.DashboardBMR = this.acessoBMR ? 1 : 0;
        // usuarioModel.DashboardVolumetria = this.acessoVolumetria ? 1 : 0;

        var portaisSelectForUser = [];


        if (this.dataSelectBancoModel && this.dataSelectBancoModel.length) {
          this.dataSelectBancoModel.forEach(x => {
            if (x)
              portaisSelectForUser.push(x.CodBanco);
          });
          // usuarioModel.Portais = portaisSelectForUser.join(",");
        }
        else {
          // usuarioModel.Portais ="";
        }



        this.InsertUser(usuarioModel);
      }
    }

    // if (this.tipoTela == 3 && this.tipoUserModel.CodUserPerfil != 2) {
    //   if (this.graficoMonitor.length < 1) {
    //     this.validPortais = true;
    //     return;
    //   }
    // }


    // Atualizar Tipo 3
    if (this.tipoTela == 3) {
      if (this.valorNomeUser && this.valorEmailUser) {

        var usuarioModel = new UsuarioModel();
        usuarioModel.FlagAtivo = true;
        usuarioModel.Email = this.valorEmailUser;
        usuarioModel.Password = this.valorSenhaUser;
        usuarioModel.Name = this.valorNomeUser;
        usuarioModel.CodUserPerfil = this.tipoUserModel.CodUserPerfil;
        usuarioModel.CodUser = this.valorIdUser;
        // usuarioModel.DashboardBMR = this.acessoBMR ? 1 : 0;
        // usuarioModel.DashboardVolumetria = this.acessoVolumetria ? 1 : 0;
        var portaisSelectForUser = [];


        if (this.dataSelectBancoModel && this.dataSelectBancoModel.length) {
          this.dataSelectBancoModel.forEach(x => {
            if (x)
              portaisSelectForUser.push(x.CodBanco);
          });
          // usuarioModel.Portais = portaisSelectForUser.join(",");
        }
        else {
          // usuarioModel.Portais ="";
        }

        this.UpdateUser(usuarioModel);
      }
    }


  }

  openEdit(user: UsuarioModel) {
    this.validPortais = false;
    this.tipoTela = 3;
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();

    this.valorNomeUser = user.Name;
    this.valorEmailUser = user.Email;
    this.valorSenhaUser = user.Password;
    this.valorIdUser = user.CodUser;
    // this.acessoBMR = user.DashboardBMR;
    // this.acessoVolumetria = user.DashboardVolumetria;

    this.carregaTipoAtivo(user.FlagAtivo ? 1 : 0);
    this.carregaTipoUsuario(user.CodUserPerfil);
    // this.carregaPortaisUser(user.Portais);

  }


  openEditDelet(user: UsuarioModel) {
    this.tipoTela = 4;
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();

    this.valorNomeUser = user.Name;
    this.valorEmailUser = user.Email;
    this.valorSenhaUser = user.Password;
    this.valorIdUser = user.CodUser;
    this.carregaTipoAtivo(user.FlagAtivo ? 1 : 0);
    this.carregaTipoUsuario(user.CodUserPerfil);
  }


  ListBancos() {

    this.unSubscribe = this.userService.ListBancos(null).subscribe(
      response => {
        this.dataBancoModel = response;
      },
      err => {
        console.log(err);
      },
      () => {
        // this.dataUsers = this.dataUsers.sort((a, b) => a.Name.localeCompare(b.Name));
        return this.dataBancoModel;
      }
    );
  }

  filtrarUsuarios() {
    const texto = this.searchText.toLowerCase();
    this.filteredUsers = this.dataUsers.filter(user =>
      user.Name.toLowerCase().includes(texto) ||
      user.Email.toLowerCase().includes(texto)
    );
    this.p = 1; // resetar paginação ao filtrar
  }

  ListarUsuarios() {

    this.unSubscribe = this.userService.ListUsers(null).subscribe(
      response => {
        this.dataUsers = response;
        this.filteredUsers = this.dataUsers;
      },
      err => {
        console.log(err);
      },
      () => {
        // this.dataUsers = this.dataUsers.sort((a, b) => a.Name.localeCompare(b.Name));
        return this.dataUsers;
      }
    );
  }

  UpdateUser(UsuarioModel: UsuarioModel) {
    debugger
    if (UsuarioModel.CodUser == 1) {
      this.tipoTela = 1;
      this.limparTela();
      return;
    }

    UsuarioModel.FlagAtivo = this.tipoAtivoModel.CodUserPerfil == 1;


    this.unSubscribe = this.userService.UpdateUser(UsuarioModel).subscribe(
      response => {
        this.dataUsers = response;
      },
      err => {
        console.log(err);
      },
      () => {
        // this.authService.setUser(UsuarioModel);
        // this.tipoTela = 1;
        // this.limparTela();

        this.tipoTela = 1;
        this.limparTela();

      }
    );
  }

  InsertUser(UsuarioModel: UsuarioModel) {
    this.unSubscribe = this.userService.InsertUser(UsuarioModel).subscribe(
      response => {
        this.dataUsers = response;
      },
      err => {
        console.log(err);
      },
      () => {
        this.tipoTela = 1;
        this.limparTela();
      }
    );

  }

  UserForDelete() {
    var usuarioModel = new UsuarioModel();
    usuarioModel.FlagAtivo = true;
    usuarioModel.Email = this.valorEmailUser;
    usuarioModel.Password = this.valorSenhaUser;
    usuarioModel.Name = this.valorNomeUser;
    usuarioModel.CodUserPerfil = this.tipoUserModel.CodUserPerfil;
    usuarioModel.CodUser = this.valorIdUser;

    this.unSubscribe = this.userService.UserForDelete(usuarioModel).subscribe(
      response => {
        this.dataUsers = response;
      },
      err => {
        console.log(err);
      },
      () => {
        this.tipoTela = 1;
        this.limparTela();
      }

    );
  }

  carregaTipoUsuario(tipoUser: number = 2) {

    var lista = Array<any>();

    var tipo2 = new TipoUsuario();
    tipo2.CodUserPerfil = 2;
    tipo2.DescUserPerfil = "COMUM";
    lista.push(tipo2);

    var tipo1 = new TipoUsuario();
    tipo1.CodUserPerfil = 1;
    tipo1.DescUserPerfil = "ADMIN";
    lista.push(tipo1);

    // var tipo3 = new TipoUsuario();
    // tipo3.CodUserPerfil = 3;
    // tipo3.DescUserPerfil = "MONITOR";
    // lista.push(tipo3);

    if (tipoUser == 1) {
      this.tipoUserModel = tipo1;
    }

    if (tipoUser == 2) {
      this.tipoUserModel = tipo2;
    }

    // if (tipoUser == 3) {
    //   this.tipoUserModel = tipo3;
    // }

    this.listatipoUserModel = lista;
  }

  carregaTipoAtivo(userAtivo: number = 1) {

    var lista = Array<any>();
    var ativo = new TipoUsuario();
    ativo.CodUserPerfil = 1;
    ativo.DescUserPerfil = "ATIVO";
    lista.push(ativo);

    var ativoNo = new TipoUsuario();
    ativoNo.CodUserPerfil = 2;
    ativoNo.DescUserPerfil = "DESATIVADO";
    lista.push(ativoNo);


    if (userAtivo == 1)
      this.tipoAtivoModel = ativo;
    else
      this.tipoAtivoModel = ativoNo;


    this.listatipoAtivoModelModel = lista;
  }

  carregaPortaisUser(Portais: string) {

    if (Portais != null && Portais != undefined) {
      this.dataSelectBancoModel = Array<BancoModel>();

      var listPortaisUser = [];

      var listPortais = [];
      listPortais = Portais.split(",");
      listPortais.forEach(p => {
        var item = this.dataBancoModel.find(s => s.CodBanco == p);
        if (item != undefined) {
          listPortaisUser.push(item);
        }
      });

      this.dataSelectBancoModel = listPortaisUser;
    }

  }

  limparTela() {

    this.valorNomeUser = "";
    this.valorEmailUser = "";
    this.valorSenhaUser = "";

    this.valorIdUser = 0;
    this.NumeroJob = "";

    this.validEmail = false;
    this.validSenha = false;
    this.validNome = false;
    this.validNumeroJob = false;

    this.dataSelectBancoModel = Array<BancoModel>();

    this.ListarUsuarios();
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();
    // this.ListBancos();

  }

  limparTelaCadastro() {

    this.valorNomeUser = "";
    this.valorEmailUser = "";
    this.valorSenhaUser = "";
    this.valorIdUser = 0;
    this.NumeroJob = "";

    this.validEmail = false;
    this.validSenha = false;
    this.validNome = false;
    this.validPortais = false;
    this.validNumeroJob = false;
    this.carregaTipoUsuario();
    this.carregaTipoAtivo();

    this.dataSelectBancoModel = Array<BancoModel>();

  }

}
