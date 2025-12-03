import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Acao, Log } from '../models/usuario/log';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from './auth.service';
import { LogUsuarioModel } from '../models/LogUsuarioModel/LogUsuarioModel';
import { Session } from '../pages/home/guards/session';



@Injectable({
  providedIn: 'root'
})

export class LogService {

  ipAddress = '';

  constructor(
    public httpClient: HttpClient,
    public httpClient2: HttpClient,
    private handler: HttpBackend,
    private session: Session,
    private deviceService: DeviceDetectorService) {
    this.epicFunction();
    this.httpClient2 = new HttpClient(handler);
  }


  private readonly baseUrl = environment["endPoint"];

  isMobile;
  device = "Web";

  epicFunction() {
    console.log('hello `Home` component');
    this.isMobile = this.deviceService.isMobile();
  }


  GravaLog(logUsuarioModel: LogUsuarioModel) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/Log/GravaLog/`,
      logUsuarioModel
    );
  }

  GravaLogRota(URL: string) {
    var logUsuarioModel = new LogUsuarioModel();
    var sessao = this.session.getSession();

    var CodUser = sessao["CodUser"];
    var Email = sessao["Email"];

    logUsuarioModel.CodUser = CodUser;
    logUsuarioModel.Email = Email;
    logUsuarioModel.URL = URL;

    var IP = "";// this.session.getSessionIPLogado();
    logUsuarioModel.IP = IP;

    return this.httpClient.post<any>(
      `${this.baseUrl}/Log/GravaLog/`,
      logUsuarioModel
    );

    // if (!IP || IP == "" || IP == null) {

    //   try {
    //     this.getIPAddress().subscribe((res: any) => {
    //       this.session.createSessionIPLogado(res.ip);
    //       logUsuarioModel.IP = res.ip;
    //       return this.httpClient.post<any>(
    //         `${this.baseUrl}/Log/GravaLog/`,
    //         logUsuarioModel
    //       );
    //     });
    //   } catch (error) {
    //   }
    // }
    // else {

    //   logUsuarioModel.IP = IP;

    //   return this.httpClient.post<any>(
    //     `${this.baseUrl}/Log/GravaLog/`,
    //     logUsuarioModel
    //   );
    // }

    return null;

  }

  getIPAddress() {
    // try {
    //   this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
    //     debugger
    //     this.session.createSessionIPLogado(res.ip);
    //   });
    // } catch (error) {     
    // }

    return this.httpClient2.get("http://api.ipify.org/?format=json");

  }

}

