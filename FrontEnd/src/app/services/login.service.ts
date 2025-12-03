import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao } from '../models/Filtros/FiltroPadrao';
import { LoginAcesso, Token } from '../models/login/login-acesso';
import { PopupMsn } from '../models/PopupMsn/PopupMsn';
import { UsuarioModel } from '../models/usuario/UsuarioModel';
import {BancoModel} from '../models/usuario/BancoModel';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  getData(): string {
    return this.dataAtualFormatada()
  }

  dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      horas = new Date().getHours(),
      horasF = horas < 10 ? '0' + horas : horas,
      minutos = new Date().getMinutes(),
      minutosF = minutos < 10 ? '0' + minutos : minutos,
      segundos = new Date().getSeconds(),
      segundosF = segundos < 10 ? '0' + segundos : segundos
    return anoF + mesF + diaF + horasF + minutosF + segundosF
  }

 

  public dataLoginAcesso: any;
  private readonly baseUrl = environment["endPoint"];

  private readonly usuario = 'Usuario';

  private userAuthenticated: boolean = false;
  adminAccess = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient) { }

  login(Email: string, Password: string, IP: string) {
    return this.httpClient.post<UsuarioModel>(`${this.baseUrl}/${this.usuario}/Login`, { Email: Email, Password: Password, IP: IP })
  }

  loginIntegrado(CodUser:number) {
    return this.httpClient.post<UsuarioModel>(`${this.baseUrl}/${this.usuario}/LoginIntegrado`, { CodUser: CodUser })
  }

  token(loginAcesso: LoginAcesso) {
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
    };

    const body = new HttpParams()
      .set("username", loginAcesso.EmailUser)
      .set("password", loginAcesso.Senha)
      .set("grant_type", "password");

    return this.httpClient.post<Token>(`${this.baseUrl}/token`, body, {
      headers,
    });
  }

  solicitarNovaSenha(login, email) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/nova-senha`, { login: login, email: email })

  }

  cadastrarNovaSenha(token, senha) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/atualizar-senha`, { Token: token, Senha: senha });
  }

  validarToken(token) {
    return this.httpClient.get(`${this.baseUrl}/${this.usuario}/validar-token/?token=${token}`);
  }

  verficaCodeLDAP(code): any {
    return this.httpClient.get(`${this.baseUrl}/${this.usuario}/verfica-code-ldap?code=${code}`);
  }

  getUsuario(id) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/usuario-autenticado/?id=${id}`, {})
  }

  isAuthenticated() {
    return this.userAuthenticated;
  }

  logout() {
    localStorage.removeItem('user');
  }


  CarregarPopUpMsn(filtro:FiltroPadrao) {
    return this.httpClient.post<PopupMsn>(`${this.baseUrl}/${this.usuario}/CarregarPopUpMsn`, filtro)
  }

  UpdatePopupUser(usuarioModel:UsuarioModel) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/UpdatePopupUser`, usuarioModel)
  }

  
  // Tela de usuários
  InsertUser(usuarioModel:UsuarioModel) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/InsertUser`, usuarioModel)
  }

  UpdateUser(usuarioModel:UsuarioModel) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/UpdateUser`, usuarioModel)
  }

  UserForDelete(usuarioModel:UsuarioModel) {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.usuario}/UserForDelete`, usuarioModel)
  }

  ListUsers(usuarioModel:UsuarioModel) {
    return this.httpClient.post<Array<UsuarioModel>>(`${this.baseUrl}/${this.usuario}/ListUsers`, usuarioModel)
  }



  /// Usuarios bancos
  ListBancos(usuarioModel:UsuarioModel) {
    return this.httpClient.post<Array<BancoModel>>(`${this.baseUrl}/${this.usuario}/ListBancos`, usuarioModel)
  }


  ListPortalDisponivel(usuarioModel:UsuarioModel) {
    return this.httpClient.post<Array<BancoModel>>(`${this.baseUrl}/${this.usuario}/ListPortalDisponivel`, usuarioModel)
  }

}