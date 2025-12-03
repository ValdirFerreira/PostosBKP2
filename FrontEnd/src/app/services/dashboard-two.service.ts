import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashBoardTwoService {

  constructor(public httpClient: HttpClient,
    public httpClient2: HttpClient,
    private handler: HttpBackend,
    private authService: AuthService,) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];

  carregarGraficoComparativoMarcas(filtro: FiltroPadrao) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/DashBoardTwo/CarregarGraficoComparativoMarcas/`,
      filtro
    );
  }
 
  
}
