import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoFullLoad } from '../models/Filtros/FiltroPadrao';

import { AuthService } from './auth.service';
import { Postos, Proprietario } from '../models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest, ResponseCad } from '../models/PainelPostos/ProprietarioCadastrarRequest';
import { AssociacaoPostoConsultarPeloIDResponse, AssociacaoPostoConsultarResponse, FilePostos, PostoAssociacaoAtualizarRequest, PostoAssociacaoCadastrarRequest, PostoDadosResponse, PostoFuncionarioCadastrarRequest, PostoFuncionarioConsultarResponse, PostoServicoConsultarResponse, PostoServicoOpcaoAtualizarRequest } from '../models/PainelPostos/FilePostos';
import { PesquisaQuestaoListagemResponse, PesquisaRequest, PesquisaRespostaCadastrarRequest, PesquisaRespostaCadastrarResponse, PesquisaVerificaRespostaRequest, PesquisaVerificaRespostaResponse } from '../models/PesquisaModel/PesquisaModel';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  constructor(public httpClient: HttpClient,
    public httpClient2: HttpClient,
    private handler: HttpBackend,
    private authService: AuthService,) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];


  ConsultarPesquisaQuestoes(model: PesquisaRequest) {
    return this.httpClient.post<PesquisaQuestaoListagemResponse[]>(
      `${this.baseUrl}/Pesquisa/ConsultarPesquisaQuestoes`,
      model
    );
  }

VerificarPesquisaResposta(model: PesquisaVerificaRespostaRequest) {
  return this.httpClient.post<PesquisaVerificaRespostaResponse>(
    `${this.baseUrl}/Pesquisa/VerificarPesquisaResposta`,
    model
  );
}

CadastrarPesquisaResposta(model: PesquisaRespostaCadastrarRequest) {
  return this.httpClient.post<PesquisaRespostaCadastrarResponse>(
    `${this.baseUrl}/Pesquisa/CadastrarPesquisaResposta`,
    model
  );
}


}
