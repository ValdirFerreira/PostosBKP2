import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';
import { Proprietario } from '../models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest, ProprietarioCadastrarResponse } from '../models/PainelPostos/ProprietarioCadastrarRequest';

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
    return this.httpClient.post<ProprietarioCadastrarResponse>(
      `${this.baseUrl}/PainelPostos/ProprietarioCadastrar`,
      model
    );
  }



}
