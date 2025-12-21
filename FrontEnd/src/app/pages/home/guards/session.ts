import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario/UsuarioModel';


@Injectable()

export class Session {

    constructor() { }

    createSession(user: UsuarioModel) {
        localStorage.setItem('userLogSistem', JSON.stringify(user));
    }

    getSession() {
        let user = JSON.parse(localStorage.getItem('userLogSistem'));
        return user;
    }

    removeSession() {
        localStorage.removeItem('userLogSistem');
    }

    updateSession(user: UsuarioModel) {

        localStorage.removeItem('userLogSistem');

        localStorage.setItem('userLogSistem', JSON.stringify(user));

        let userSession = JSON.parse(localStorage.getItem('userLogSistem'));

        return userSession;
    }

    getCodUserSession() {
        let user = JSON.parse(localStorage.getItem('userLogSistem')) as UsuarioModel;
        return user.CodUser;
    }

    getUserSession() {
        let user = JSON.parse(localStorage.getItem('userLogSistem')) as UsuarioModel;
        return user
    }

    createSessionIPLogado(IP: string) {
        localStorage.removeItem('ipuserLogSistemLogado');
        localStorage.setItem('ipuserLogSistemLogado', IP);
    }

    getSessionIPLogado() {
        let IP = localStorage.getItem('ipuserLogSistemLogado');
        return IP;
    }



    private readonly KEY = 'codmenu-only-session';

    createcodMenuSession(session: number): void {
        localStorage.setItem(this.KEY, JSON.stringify(session));
    }

    getcodMenuSession(): number | null {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : null;
    }

    existscodMenuSession(): boolean {
        return !!localStorage.getItem(this.KEY);
    }

    clearcodMenuSession(): void {
        localStorage.removeItem(this.KEY);
    }


}