
export class Log {

    constructor(_acao: Acao, _usuario: string, _data: Date, _isLogin: boolean, _descricao: string, _device: string) {

        this.acao = _acao;
        this.usuario = _usuario;
        this.data = _data;
        this.isLogin = _isLogin;
        this.descricao = _descricao;
        this.device = _device;
    }

    acao: Acao;
    usuario: string;
    data: Date;
    isLogin: boolean;
    descricao: string;
    device: string;

}

export enum Acao {
    Login = 'Login',
    Jornada = 'Jornada',
    DetalhePesquisa = 'Detalhe-Pesquisa',
    DetalheCompra = 'Detalhe-Compra',
    DetalhePosCompra = 'Detalhe-Pos-Compra',
    DetalheContato = 'Detalhe-Contato',
    DetalheRecompra = 'Detalhe-Recompra',
    ImprimirJornada = 'Imprimir-Jornada',
    Downloads = 'Download',
    GestaoAcesso = 'Gestao-Acesso',
    SolicitacaoNovaSenha = 'Solicitacao-Nova-Senha'
}
