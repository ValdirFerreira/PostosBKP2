export class PostoModel {
  Cargo: string;
  Bandeira: string;
  RazaoSocial: string;
  NomeFantasia: string;
  Endereco: string;
  Complemento: string;
  CEP: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
}


export class ServicoOpcao {
  nome: string;
  ativo: boolean;
}

export class ServicoCategoria {
  titulo: string;
  descricao: string;
  opcoes: ServicoOpcao[];
}
