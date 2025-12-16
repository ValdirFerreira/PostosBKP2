export class PesquisaRequest {
  CodSegmento: number;
  CodIdioma: number;
}

export class PesquisaQuestaoListagemResponse {
  CodPesquisaListagemQuestao: number;
  CodSegmento: number;
  Segmento: string;
  CodTituloBloco: number;
  TituloBloco: string;
  CodVariavel: number;
  Variavel: string;
  Descricao: string;

  ListOpcoes: PesquisaQuestaoOpcaoResponse[];
}

export class PesquisaQuestaoOpcaoResponse {
  CodPesquisaListagemQuestao: number;
  CodSegmento: number;
  Segmento: string;
  CodTituloBloco: number;
  TituloBloco: string;
  CodVariavel: number;
  Variavel: string;
  Opcao: string;
  Descricao: string;
}


export class PesquisaVerificaRespostaRequest {
  ParamDocumento: string;
}
export class PesquisaVerificaRespostaResponse {
  PassagemCliente: number;
}



export class PesquisaRespostaCadastrarRequest {
  ParamRespostas: string;
  ParamCodSegmento: number;
  ParamClienteDocumento: number;
}
export class PesquisaRespostaCadastrarResponse {
  CodCliente: number;
  ErroCadastro: number;
}
