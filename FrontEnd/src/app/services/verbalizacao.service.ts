import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParamGeralFiltro } from '../models/Filtros/ParamGeralFiltro';
import { VerbalizacaoModel } from '../models/Verbalizacao/VerbalizacaoModel';


import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class VerbalizacaoService {


  constructor(public httpClient: HttpClient, public httpClient2: HttpClient, handler: HttpBackend) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];



  ObterVerbalizacao(filtro: ParamGeralFiltro) {
    return this.httpClient.post<Array<VerbalizacaoModel>>(
      `${this.baseUrl}/verbalizacao/ObterVerbalizacao/`,
      filtro
    );
  }


}