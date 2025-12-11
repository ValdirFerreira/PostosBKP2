import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PadraoComboFiltro } from '../models/padrao-combo-filtro/padrao-combo-filtro';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { ParamGeralFiltro } from './param-filtro';
import { Session } from '../pages/home/guards/session';
import moment from 'moment';
import { ParamFiltro, ParamFiltroPostos } from '../models/Filtros/PadraoComboFiltro';

@Injectable({
  providedIn: 'root',
})
export class FiltroGlobalService {
  private _dtExpires: string;

  public filtroMobileAtivo: boolean = false;

  public filtroEmitter: boolean = true;

  // LISTA BANCO
  public listaTarget: Array<PadraoComboFiltro>;
  //MODEL
  // public ModelTarget: Array<PadraoComboFiltro>;;
  public ModelTarget: PadraoComboFiltro;

  public listaOnda: Array<PadraoComboFiltro>;
  //MODEL
  public ModelOnda: PadraoComboFiltro;

  public listaMarcas: Array<PadraoComboFiltro>;
  //MODEL
  public ModelMarcas: PadraoComboFiltro;

  public listaDemografico: Array<PadraoComboFiltro>;
  //MODEL
  public ModelDemografico: Array<PadraoComboFiltro>;

  public listaRegiao: Array<PadraoComboFiltro>;
  //MODEL
  public ModelRegiao: Array<PadraoComboFiltro>;

  public listaDenominators: Array<PadraoComboFiltro>;

  public ModelDenominators: PadraoComboFiltro;

  public listaMarcasAdhoc: Array<PadraoComboFiltro>;

  private environmentAccess: string[] = ['DEV', 'HML', 'PROD'];

  constructor(
    public httpClient: HttpClient,
    public httpClient2: HttpClient,
    handler: HttpBackend,
    private session: Session
  ) {
    this.httpClient2 = new HttpClient(handler);
  }

  private readonly baseUrl = environment['endPoint'];

  iniciarSessaoUser() {
    this.DtExpires = moment().add(30, 'minutes').format();
  }

  public validEmitter() {
    if (!this.filtroEmitter) {
      this.filtroEmitter = true;
    } else {
      this.filtroEmitter = false;
    }
    return this.filtroEmitter;
  }

  private carregaParametrosFiltro() {
    var paramGeralFiltro = new ParamGeralFiltro();
    paramGeralFiltro.CodIdiomaParam = 1; //COLOCAMOS O CÓDIGO 1 PORQUE E DEFAULT PORTUGUES DO PROJETO
    let _session = this.session.getSession();
    if (_session !== null) {
      paramGeralFiltro.CodUserParam = _session.CodUser;
    }
    return paramGeralFiltro;
  }

  //get;set DtExpires
  set DtExpires(dtExpires: string) {
    if (this.environmentAccess.includes(environment.local))
      localStorage.setItem('dtExpires', dtExpires);

    this._dtExpires = dtExpires;
  }

  get DtExpires() {
    if (this.environmentAccess.includes(environment.local))
      this._dtExpires = localStorage.getItem('dtExpires') || '';

    return this._dtExpires;
  }

  FiltroTarget() {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroTarget/`,
      this.carregaParametrosFiltro()
    );
  }

  FiltroOnda() {
    var filtro = this.carregaParametrosFiltro();

    if (this.ModelTarget && this.ModelTarget.IdItem > 0) {
      filtro.ParamTarget = this.ModelTarget.IdItem;
    } else {
      filtro.ParamTarget = 2;
    }

    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroOnda/`,
      filtro
    );
  }

  FiltroMarcas(
    modelRegiao: Array<PadraoComboFiltro> = null,
    modelOnda: PadraoComboFiltro = null
  ) {
    var filtro = this.carregaParametrosFiltro();

    if (modelRegiao) filtro.Regiao = modelRegiao;
    // else{
    //   filtro.Regiao = this.listaRegiao
    // }
    // filtro.ParamTipoChocolate = modelTipoChocolate.IdItem;

    if (this.ModelTarget && this.ModelTarget.IdItem > 0) {
      filtro.ParamTarget = this.ModelTarget.IdItem;
    } else {
      filtro.ParamTarget = 2;
    }

    if (modelOnda) {
      filtro.CodOndaParam = modelOnda.IdItem;
    } else {
      if (this.ModelOnda && this.ModelOnda.IdItem > 0) {
        filtro.CodOndaParam = this.ModelOnda.IdItem;
      } else {
        filtro.CodOndaParam = this.listaOnda ? this.listaOnda[0].IdItem : 2;
      }
    }

    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroMarcas/`,
      filtro
    );
  }

  FiltroMarcasModoDenominators(modelRegiao: Array<PadraoComboFiltro>) {
    var filtro = this.carregaParametrosFiltro();
    filtro.Regiao = modelRegiao;
    filtro.ParamDenominators = 2;

    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroMarcas/`,
      filtro
    );
  }

  FiltroMarcasAdHoc(CodBlocoParam: number) {
    var filtro = this.carregaParametrosFiltro();
    filtro.CodBlocoParam = CodBlocoParam;
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroMarcasAdHoc/`,
      filtro
    );
  }

  FiltroDemografico() {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroDemografico/`,
      this.carregaParametrosFiltro()
    );
  }

  FiltroRegiao() {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroRegiao/`,
      this.carregaParametrosFiltro()
    );
  }

  FiltroAtributos(tipoBia: number) {
    var param = this.carregaParametrosFiltro();
    param.ParamBIA = tipoBia;

    if (this.ModelTarget && this.ModelTarget.IdItem > 1) {
      param.ParamBIA = this.ModelTarget.IdItem;
    } else {
      param.ParamBIA = 1;
    }

    if (this.ModelOnda && this.ModelOnda.IdItem >= 1) {
      param.CodOndaParam = this.ModelOnda.IdItem;
    } else {
      param.CodOndaParam = this.listaOnda ? this.listaOnda[0].IdItem : 2;
    }

    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroAtributos/`,
      param
    );
  }

  FiltroBVC() {

    var filtro = this.carregaParametrosFiltro();

    if (this.ModelTarget && this.ModelTarget.IdItem > 0) {
      filtro.ParamTarget = this.ModelTarget.IdItem;
    } else {
      filtro.ParamTarget = 2;
    }

    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroBVC/`,
      this.carregaParametrosFiltro()
    );
  }

  FiltroSTB(modelOnda: PadraoComboFiltro) {
    var filtro = this.carregaParametrosFiltro();
    filtro.CodOndaParam = modelOnda.IdItem;
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroSTB/`,
      filtro
    );
  }

  FiltroAdHoc() {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroAdHoc/`,
      null
    );
  }





  /////////////////////////////////////////////////////////////////////////////////


  FiltroStatus(filtro: ParamFiltro) {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroStatus/`,
      filtro
    );
  }


  FiltroPostos(filtro: ParamFiltroPostos) {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroPostos/`,
      filtro
    );
  }


  FiltroFuncionarioFuncoes(filtro: ParamFiltro) {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroFuncionarioFuncoes/`,
      filtro
    );
  }

  FiltroTipoPessoa(filtro: ParamFiltro) {
    return this.httpClient.post<Array<PadraoComboFiltro>>(
      `${this.baseUrl}/filtros/FiltroTipoPessoa/`,
      filtro
    );
  }




}
