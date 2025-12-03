import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BancoModel } from '../models/usuario/BancoModel';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Session } from '../pages/home/guards/session';
import { UsuarioModel } from '../models/usuario/UsuarioModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private environmentAccess: string[] = ['DEV', 'HML', 'PROD'];

  private readonly numPortal = environment['numPortal'];

  private usuarioAutenticadoPortal: boolean = false;
  idDefaultLangUser: 1; //COLOCAMOS O CÓDIGO 1 PORQUE E DEFAULT PORTUGUES DO PROJETO
  private token: any;
  private user: any;
  private acessos: any;
  private _ip: string;

  constructor(
    public router: Router,
    private session: Session,
    private userService: LoginService
  ) {}

  UsuarioAutenticado(status: boolean) {
    localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
    this.usuarioAutenticadoPortal = status;
  }

  //GET;SET IP
  IpAddressAPI(): Promise<any> {
    let url = location.protocol + '//api.ipify.org/?format=json';

    return fetch(url, { method: 'GET' }).then((response) => response.json());
  }

  set IP(ip: string) {
    if (this.environmentAccess.includes(environment.local)) {
      if (ip != '' && ip != null) localStorage.setItem('ip', ip);
      else localStorage.removeItem('ip');
    }

    this._ip = ip;
  }

  get IP(): string {
    if (this.environmentAccess.includes(environment.local))
      this._ip = localStorage.getItem('ip') ?? '';

    return this._ip;
  }

  UsuarioEstaAutenticado(): Promise<boolean> {
    this.usuarioAutenticadoPortal =
      localStorage.getItem('usuarioAutenticadoPortal') == 'true';
    return Promise.resolve(this.usuarioAutenticadoPortal);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  get getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  setAcessosUser(acessos: any) {
    localStorage.setItem('AcessosUserGrupo', JSON.stringify(acessos));
    this.acessos = acessos;
  }

  getAcessosUser() {
    this.acessos = JSON.parse(localStorage.getItem('AcessosUserGrupo'));
    return this.acessos;
  }

  verificaAcesso() {
    // var acessosUser = this.getAcessosUser() as Array<BancoModel>;
    // if (acessosUser) {

    //   var acesso = acessosUser.find(x => x.CodBanco == 2);

    //   if (!acesso) {
    //     this.router.navigate(['/home']);
    //   }
    // }
    // else {
    //   this.router.navigate(['/home']);
    // }
    this.ListPortalDisponivel();
  }

  ListPortalDisponivel() {
    var acessosUser = this.getAcessosUser() as Array<BancoModel>;
    if (acessosUser) {
      var acesso = acessosUser.find((x) => x.CodBanco == this.numPortal);

      if (!acesso) {
        this.router.navigate(['/home']);
      }
    } else {
      var user = this.session.getUserSession();

      if (user) {
        var usuarioModel = new UsuarioModel();
        usuarioModel.CodUser = user.CodUser;
        this.userService.ListPortalDisponivel(usuarioModel).subscribe(
          (response) => {
            this.setAcessosUser(response);

            var acesso = response.find((x) => x.CodBanco == 2);
            if (!acesso) {
              this.router.navigate(['/home']);
            }
          },
          (err) => {
            console.log(err);
            this.router.navigate(['/home']);
          },
          () => {}
        );
      }
    }
  }

  limparToken() {
    this.token = null;
    this.user = null;
    this.acessos = null;
  }

  limparDadosUsuario() {
    this.UsuarioAutenticado(false);
    this.limparToken();
    localStorage.clear();
    sessionStorage.clear();
  }
}
