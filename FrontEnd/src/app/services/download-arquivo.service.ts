import { HttpBackend, HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroPadrao, FiltroPadraoExcel, FiltroPadraoExcelDuplo } from '../models/Filtros/FiltroPadrao';
import { LoginAcesso, Token } from '../models/login/login-acesso';
import { StatusDownloadFile } from '../models/StatusDownloadFile/StatusDownloadFile';


import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DownloadArquivoService {

  public statusDownloadFile: StatusDownloadFile;

  getData(): string {
    return this.dataAtualFormatada()
  }

  dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      horas = new Date().getHours(),
      horasF = horas < 10 ? '0' + horas : horas,
      minutos = new Date().getMinutes(),
      minutosF = minutos < 10 ? '0' + minutos : minutos,
      segundos = new Date().getSeconds(),
      segundosF = segundos < 10 ? '0' + segundos : segundos
    return anoF + mesF + diaF + horasF + minutosF + segundosF
  }


  constructor(public httpClient: HttpClient, public httpClient2: HttpClient, handler: HttpBackend, private authService: AuthService,) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment["endPoint"];



  // downloadArquivo(filtros: ParamGeralFiltro) {

  //   let headers = new HttpHeaders()
  //   .append("accept", "application/json")
  //   .append("Content-Type", "application/json")
  //   .append("Authorization", "Bearer " + this.authService.getToken);

  //   return this.httpClient.post<Blob>(
  //     `${this.baseUrl}/excel/DownloadArquivo`,
  //     filtros,
  //     {
  //       // headers: headers, reportProgress: true,
  //       // observe: 'events', responseType: 'blob' as 'json'
  //       headers: headers,
  //       responseType: 'blob' as 'json'
  //     },
  //   )
  // }


  DownloadExcelTabelaDinamicaExcelLojas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadExcelTabelaDinamicaExcelLojas`,
      null,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadExcelTabelaDinamicaExcelOnline() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadExcelTabelaDinamicaExcelOnline`,
      null,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  // DashboardTwo

  DownloadDashboardTwoComparativoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardTwoComparativoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardTwoEvolutivoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardTwoEvolutivoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardTwoComparativoMarcasDenominators(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardTwoComparativoMarcasDenominators`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardTwoEvolutivoMarcasDenominators(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardTwoEvolutivoMarcasDenominators`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  // DashboardTwo

  // DashboardThree
  DownloadDashboardThreeComparativoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardThreeComparativoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardThreeEvolutivoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardThreeEvolutivoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }
  // DashboardThree


  // DashboardFour
  DownloadDashboardFourComparativoMarcas(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFourComparativoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardFourEvolutivoPeriodos(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFourEvolutivoPeriodos`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  DownloadDashboardFourComparativoImagemPura(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFourComparativoImagemPura`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }



  // DashboardFour


  // DashboardFive

  DownloadDashboardFiveComparativoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFiveComparativoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardFiveEvolutivoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFiveEvolutivoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  DownloadDashboardFiveComparativoMarcasDuplo(request: FiltroPadraoExcelDuplo) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardFiveComparativoMarcasDuplo`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  // DashboardFive



  // DashboardSix

  DownloadDashboardSixGraficoBVCTop10Marcas(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardSixGraficoBVCTop10Marcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardSixGraficoBVCEvolutivo(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardSixGraficoBVCEvolutivo`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardSixEvolutivoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardSixEvolutivoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  DownloadDashboardSixComparativoMarcasDuplo(request: FiltroPadraoExcelDuplo) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardSixComparativoMarcasDuplo`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  // DashboardSix



  // DashboardSeven

  DownloadDashboardGraficoComunicacaoVisto(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardGraficoComunicacaoVisto`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardGraficoComunicacaoSource(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardGraficoComunicacaoSource`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardGraficoComunicacaoRecall(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardGraficoComunicacaoRecall`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardGraficoComunicacaoDiagnostico(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardGraficoComunicacaoDiagnostico`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  // DashboardSeven



  //DashBoardEight
  DownloadDashboardEightComparativoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardEightComparativoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardEightEvolutivoMarcas(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardEightEvolutivoMarcas`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  //DashboardNine

  DownloadDashboardNineEvolutivoPeriodos(request: FiltroPadraoExcel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardNineEvolutivoPeriodos`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  DownloadDashboardNineComparativoImagemPura(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardNineComparativoImagemPura`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardNineComparativoImagemPura2(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardNineComparativoImagemPura2`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }


  DownloadDashboardNineTabelaAdHoc(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardNineTabelaAdHoc`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }

  DownloadDashboardNineTabelaAdHocBloco6(request: FiltroPadrao) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
    return this.httpClient.post<Blob>(
      `${this.baseUrl}/excel/DownloadDashboardNineTabelaAdHocBloco6`,
      request,
      { headers: headers, responseType: 'blob' as 'json' },
    )
  }
  //DashboardNine



DownloadDashboardNineTabelaAdHocBloco10(request: FiltroPadrao) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
  return this.httpClient.post<Blob>(
    `${this.baseUrl}/excel/DownloadDashboardNineTabelaAdHocBloco10`,
    request,
    { headers: headers, responseType: 'blob' as 'json' },
  )
}

DownloadDashboardNineTabelaAdHocBloco2(request: FiltroPadrao) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })
  return this.httpClient.post<Blob>(
    `${this.baseUrl}/excel/DownloadDashboardNineTabelaAdHocBloco2`,
    request,
    { headers: headers, responseType: 'blob' as 'json' },
  )
}
//DashboardNine

}



