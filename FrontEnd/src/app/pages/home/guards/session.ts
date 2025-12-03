import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';


@Injectable()

export class Session {

    constructor() { }

     createSession(user: UsuarioModel) {
        localStorage.setItem('userNestleGUMs', JSON.stringify(user));
    }

    getSession() {
        let user = JSON.parse(localStorage.getItem('userNestleGUMs'));
        return user;
    }

    removeSession() {
        localStorage.removeItem('userNestleGUMs');
    }

    updateSession(user: UsuarioModel) {

        localStorage.removeItem('userNestleGUMs');

        localStorage.setItem('userNestleGUMs', JSON.stringify(user));

        let userSession = JSON.parse(localStorage.getItem('userNestleGUMs'));

        return userSession;
    }

    getCodUserSession() {
        let user = JSON.parse(localStorage.getItem('userNestleGUMs')) as UsuarioModel;
        return user.CodUser;
    }

    getUserSession() {
        let user = JSON.parse(localStorage.getItem('userNestleGUMs')) as UsuarioModel;
        return user
    }

    createSessionIPLogado(IP: string) {
        localStorage.removeItem('ipuserNestleGUMsLogado');
        localStorage.setItem('ipuserNestleGUMsLogado', IP);
    }

    getSessionIPLogado() {
        let IP = localStorage.getItem('ipuserNestleGUMsLogado');
        return IP;
    }



}