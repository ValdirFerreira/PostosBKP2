
export class EsqueceuSenhaModel{
    constructor(_login: string, _name: string) {
        this.Email = _login;
        this.Name = _name; 
     }

     Email : string;
     Name: string;
}

export class AtualizarSenhaModel{
    Token: string;
    Senha: string;
}

export class ChecaTokenModel{
    constructor(_token: string, _dataTokenUtilizado?: Date) {
        this.Token = _token;
        this.DataTokenUtilizado = _dataTokenUtilizado; 
     }

    Token: string;
    DataTokenUtilizado : Date | undefined;
}