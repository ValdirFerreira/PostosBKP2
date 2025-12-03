import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { AtualizarSenhaModel, ChecaTokenModel, EsqueceuSenhaModel } from '../models/esqueceu-senha/esqueceu-senha';


@Injectable({
  providedIn: 'root'
})
export class EsqueceuSenhaService {
  public dados: EsqueceuSenhaModel;
  private readonly baseUrl = environment["endPoint"];

  constructor(
    private httpClient: HttpClient,
  ) { }

  iniciarRequisicaoEsqueceuSenha(EsqueceuSenhaObject: EsqueceuSenhaModel) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/usuario/EsqueceuSenha`,
      EsqueceuSenhaObject
    );
  }

  verificarTokenValido(checaToken?: ChecaTokenModel) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/usuario/VerificarTokenValido`,
      checaToken
    );
  } 

  atualizarSenha(atualizarSenha: AtualizarSenhaModel) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/usuario/AtualizarSenha`,
      atualizarSenha
    );
  } 
}
