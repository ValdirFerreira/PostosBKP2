import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';
import { Postos, Proprietario } from '../models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest, ResponseCad } from '../models/PainelPostos/ProprietarioCadastrarRequest';
import { FilePostos } from '../models/PainelPostos/FilePostos';

@Injectable({
  providedIn: 'root'
})
export class EntrevistadorService {

  constructor(public httpClient: HttpClient,
    public httpClient2: HttpClient,
    private handler: HttpBackend,
    private authService: AuthService,) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];

  consultarProprietarios(codIdioma: number) {
    return this.httpClient.post<Array<Proprietario>>(
      `${this.baseUrl}/Entrevistador/EntrevistadorConsultar`,
      codIdioma
    );
  }

  EntrevistadorConsultarPeloID(cod: number) {

    let codIdioma = 1;

    const body = {
      cod,
      codIdioma
    };

    return this.httpClient.post<Array<Proprietario>>(
      `${this.baseUrl}/Entrevistador/EntrevistadorConsultarPeloID`,
      body
    );
  }


  cadastrarEntrevistador(model: ProprietarioCadastrarRequest) {
    return this.httpClient.post<ResponseCad>(
      `${this.baseUrl}/Entrevistador/EntrevistadorCadastrar`,
      model
    );
  }

ExcluirEntrevistador(cod: number) {
  return this.httpClient.delete<Response>(
    `${this.baseUrl}/Entrevistador/ExcluirEntrevistador`,
    {
      body: cod
    }
  );
}


}



