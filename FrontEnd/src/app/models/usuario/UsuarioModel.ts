
export class UsuarioModel {
    CodUser: number;
    Name: string;
    Password: string;
    Email: string;
    CreateDate: Date;
    UpdateDate?: Date;
    CodUserPerfil: number;
    FlagAtivo: boolean;
    Token: string;
    FlagPopUp:boolean;
    // Portais:string;    
}