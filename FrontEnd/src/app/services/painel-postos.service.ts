import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';
import { Proprietario } from '../models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest, ResponseCad } from '../models/PainelPostos/ProprietarioCadastrarRequest';
import { FilePostos } from '../models/PainelPostos/FilePostos';

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




}
