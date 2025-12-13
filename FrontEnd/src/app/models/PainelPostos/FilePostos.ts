export class FilePostos {
    Cod: number;
    NomeArquivo: string;
    FileBase64: string;

}


export class Postos {
  Cod: number;
  CodIdioma: number;
}

export class PostoFuncionarioCadastrarRequest {
  ParamCodPosto: number;
  ParamCodFuncionarioFuncao: number;
  ParamCodStatus: number;
  ParamNome: string;
  ParamEmail: string;
}

export class PostoFuncionarioConsultarResponse {
  CodPostoFuncionario: number;
  CodFuncao: number;
  DescricaoFuncao: string;
  CodStatus: number;
  Status: string;
  Nome: string;
  Email: string;
}

/////////////////////////////////////////////////////////////////////

export class AssociacaoPostoConsultarResponse {
  CodPostoAssociacao: number;
  CodPosto: number;
  CodStatus: number;
  Status: string;
  RazaoSocial: string;
  NomeProprietario: string;
  Bandeira: string;
  QuantidadeFuncionarios: number;
  Endereco: string;
  Complemento: string;
  CEP: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  UF: string;
}

export class AssociacaoPostoConsultarPeloIDResponse {
  CodPostoAssociacao: number;
  RazaoSocial: string;
  NomeProprietario: string;
  Bandeira: string;
  QuantidadeFuncionarios: number;
  Endereco: string;
  Complemento: string;
  CEP: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  UF: string;
}

export class PostoAssociacaoCadastrarRequest {
  ParamCodProprietario: number;
  ParamCodPosto: number;
}

export class PostoAssociacaoAtualizarRequest {
  ParamCod: number;
  ParamCodProprietario: number;
  ParamCodPosto: number;
  ParamCodStatus: number;
}


export class PostoDadosResponse {
  CodPosto: number;
  RazaoSocial: string="";
  Bandeira: string="";
  Endereco: string="";
  Complemento: string="";
  CEP: string="";
  Bairro: string="";
  Cidade: string="";
  Estado: string="";
  UF: string="";
}



export class PostoServicoOpcaoConsultarResponse {
  CodServico: number;
  DescricaoServico: string;
  CodOpcao: number;
  DescricaoOpcao: string;
  Resposta: string;
}

export class PostoServicoConsultarResponse {
  CodPostoServico: number;
  Titulo: string;
  Descricao: string;
  Ordem: number;

  ListOpcoes: PostoServicoOpcaoConsultarResponse[];


}

export class PostoServicoOpcaoAtualizarRequest {
  CodServicoOpcao: number;
  CodServico: number;
  CodPosto: number;
  CodIdioma: number;
}
