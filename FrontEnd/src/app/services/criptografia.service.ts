
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { AES } from 'crypto-js';
import { enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CriptografiaService {

  constructor() {
  }

  private readonly baseUrl = environment["endPoint"];

  execEncrypt(info: string) {
    try {
      const senha = 'ipsos-VkX1Vfa';
      // const textoCriptografado = AES.encrypt(info, senha).toString();
      const textoCriptografado = "U2FsdG("+info+"(VkX1Vfa";
      return textoCriptografado;

    } catch (error) {

      console.log("Erro ao tentar criptografar");
    }
    return null;
  }

  execDecrypt(info: string) {
    try {
      const senha = 'ipsos-VkX1Vfa';

      // const textoDescriptografado = AES.decrypt(info, senha).toString(enc.Utf8);

       var selectValor= info.split('(');

      const textoDescriptografado = selectValor[1].toString();
      
      return textoDescriptografado;

    } catch (error) {

      console.log("Erro ao tentar descriptografar");
    }
    return null;
  }







}
