import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';
import { Postos, Proprietario } from '../models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest, ResponseCad } from '../models/PainelPostos/ProprietarioCadastrarRequest';
import { AssociacaoPostoConsultarPeloIDResponse, AssociacaoPostoConsultarResponse, FilePostos, PostoAssociacaoAtualizarRequest, PostoAssociacaoCadastrarRequest, PostoFuncionarioCadastrarRequest, PostoFuncionarioConsultarResponse } from '../models/PainelPostos/FilePostos';

@Injectable({
  providedIn: 'root'
})
export class PainelPostosService {

  constructor(public httpClient: HttpClient,
    public httpClient2: HttpClient,
    private handler: HttpBackend,
    private authService: AuthService,) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];

  consultarProprietarios(codIdioma: number) {
    return this.httpClient.post<Array<Proprietario>>(
      `${this.baseUrl}/PainelPostos/ProprietarioConsultar`,
      codIdioma
    );
  }

  ProprietarioConsultarPeloID(cod: number) {

    let codIdioma = 1;

    const body = {
      cod,
      codIdioma
    };

    return this.httpClient.post<Array<Proprietario>>(
      `${this.baseUrl}/PainelPostos/ProprietarioConsultarPeloID`,
      body
    );
  }


  ProprietarioAtualizarStatus(model: ProprietarioCadastrarRequest) {
    return this.httpClient.post<ResponseCad>(
      `${this.baseUrl}/PainelPostos/ProprietarioAtualizarStatus`,
      model
    );
  }


  cadastrarProprietario(model: ProprietarioCadastrarRequest) {
    return this.httpClient.post<ResponseCad>(
      `${this.baseUrl}/PainelPostos/ProprietarioCadastrar`,
      model
    );
  }

  cadastrarFileProprietario(model: FilePostos) {
    return this.httpClient.post<boolean>(
      `${this.baseUrl}/PainelPostos/ProprietarioFileCadastrar`,
      model
    );
  }

  RecuperaArquivo(model: FilePostos) {
    return this.httpClient.post<FilePostos>(
      `${this.baseUrl}/PainelPostos/RecuperaArquivo`,
      model
    );
  }

  ///////////////////////////////////////////////////////////////
  // Parte Postos
  consultarPostos(cod: number) {

    var model = new Postos();
    model.CodIdioma = 1;
    model.Cod = cod;

    return this.httpClient.post<Array<Proprietario>>(
      `${this.baseUrl}/PainelPostos/ConsultarFuncionariosDap`,
      model
    );
  }




  // ---------------------------------------------------
  // FUNCIONÁRIOS
  // ---------------------------------------------------

  // FuncionariosConsultar(model: Postos) {
  //   return this.httpClient.post<PostoFuncionarioConsultarResponse[]>(
  //     `${this.baseUrl}/PainelPostos/FuncionariosConsultar`,
  //     model
  //   );
  // }

  CadastrarFuncionario(model: PostoFuncionarioCadastrarRequest) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/PainelPostos/CadastrarFuncionario`,
      model
    );
  }

  AtualizarFuncionario(model: PostoFuncionarioCadastrarRequest) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/PainelPostos/AtualizarFuncionario`,
      model
    );
  }

  ConsultarFuncionarios(codPosto: number, codIdioma: number) {
    return this.httpClient.get<PostoFuncionarioConsultarResponse[]>(
      `${this.baseUrl}/PainelPostos/ConsultarFuncionarios?codPosto=${codPosto}&codIdioma=${codIdioma}`
    );
  }

  ConsultarFuncionarioPeloID(cod: number, codIdioma: number) {
    return this.httpClient.get<PostoFuncionarioConsultarResponse>(
      `${this.baseUrl}/PainelPostos/ConsultarFuncionarioPeloID?cod=${cod}&codIdioma=${codIdioma}`
    );
  }

  ExcluirFuncionario(cod: number) {
    return this.httpClient.delete<any>(
      `${this.baseUrl}/PainelPostos/ExcluirFuncionario?cod=${cod}`
    );
  }

  // ---------------------------------------------------
  // ASSOCIAÇÕES
  // ---------------------------------------------------

  CadastrarAssociacao(model: PostoAssociacaoCadastrarRequest) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/PainelPostos/CadastrarAssociacao`,
      model
    );
  }

  AtualizarAssociacao(model: PostoAssociacaoAtualizarRequest) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/PainelPostos/AtualizarAssociacao`,
      model
    );
  }

  ExcluirAssociacao(cod: number) {
    return this.httpClient.delete<any>(
      `${this.baseUrl}/PainelPostos/ExcluirAssociacao?cod=${cod}`
    );
  }

  ConsultarAssociacaoPeloID(cod: number) {
    return this.httpClient.get<AssociacaoPostoConsultarPeloIDResponse[]>(
      `${this.baseUrl}/PainelPostos/ConsultarAssociacaoPeloID?cod=${cod}`
    );
  }

  ConsultarAssociacoes(codIdioma: number) {
    return this.httpClient.get<AssociacaoPostoConsultarResponse[]>(
      `${this.baseUrl}/PainelPostos/ConsultarAssociacoes?codIdioma=${codIdioma}`
    );
  }




}
