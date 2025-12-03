import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";



@Injectable({

  providedIn: "root",

})

export class TraducaoService  implements TranslateLoader {

  private readonly baseUrl = environment["endPoint"];

  constructor(private httpClient: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/Tradutor/ObterTraducao`, { IdLang:1, Lang: 'por' })

}



}