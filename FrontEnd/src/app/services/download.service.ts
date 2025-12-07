import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
 
  ) { }

  
  downloadFileFromBase64(base64String: string, fileName: string, type: string = null): void {

    let typeFile = "";

    if (type) {
      typeFile = 'application/' + type;
    }

    // Verificar e remover o prefixo Base64, se existir
    const base64HeaderPattern = /^data:([a-zA-Z0-9-+/]+);base64,/;
    let mimeType = 'application/octet-stream'; // Padrão caso não seja identificado
    const headerMatch = base64String.match(base64HeaderPattern);

    if (headerMatch) {
      mimeType = headerMatch[1]; // Extrai o MIME type
      base64String = base64String.replace(base64HeaderPattern, '');
    }

    // Converter a string base64 em um array de bytes
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);


    // Criar um Blob a partir do array de bytes
    const blob = new Blob([byteArray], { type: typeFile != "" ? typeFile : mimeType });

    // Criar um URL temporário para o arquivo
    const blobUrl = window.URL.createObjectURL(blob);

    // Criar um elemento <a> para forçar o download
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;

    // Acionar o download
    anchor.click();

    // Limpar o URL temporário
    window.URL.revokeObjectURL(blobUrl);
  }


  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        // Remover o prefixo "data:image/png;base64," se necessário
        const base64Data = base64String.split(',')[1];
        
        resolve(base64Data);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  }
  

  convertFileToBytes(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Converte o resultado para Uint8Array
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
  
      reader.onerror = (error) => reject(error);
  
      // Lê o arquivo como ArrayBuffer (bytes)
      reader.readAsArrayBuffer(file);
    });
  }
  

}