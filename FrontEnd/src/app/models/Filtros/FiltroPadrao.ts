import { PadraoComboFiltro } from "../padrao-combo-filtro/padrao-combo-filtro";

export class FiltroPadrao {

    constructor() {
        this.Target = new Array<PadraoComboFiltro>();
        this.Regiao = new Array<PadraoComboFiltro>();
        this.Demografico = new Array<PadraoComboFiltro>();
        this.Onda = new Array<PadraoComboFiltro>();
        this.Marca = new Array<PadraoComboFiltro>();
    }

    Target: Array<PadraoComboFiltro>;
    Regiao: Array<PadraoComboFiltro>;
    Demografico: Array<PadraoComboFiltro>;
    Onda: Array<PadraoComboFiltro>;
    Marca: Array<PadraoComboFiltro>;
    CodUser: number;
    CodIdioma: number;
    Sequencia: number;
    Atributo: number;
    TituloGrafico: string;
    ParamTipo:number;
    ParamOndaAtual :number;
    ParamSTB:number;
    ParamBIA:number;
    ParamDenominators:number;
}


export class FiltroPadraoExcel {

    constructor() {
        this.Target = new Array<PadraoComboFiltro>();
        this.Regiao = new Array<PadraoComboFiltro>();
        this.Demografico = new Array<PadraoComboFiltro>();
        this.Onda = new Array<PadraoComboFiltro>();
        this.Marca = new Array<PadraoComboFiltro>();

        this.Onda1 = new Array<PadraoComboFiltro>();
        this.Onda2 = new Array<PadraoComboFiltro>();
        this.Onda3 = new Array<PadraoComboFiltro>();
        this.Onda4 = new Array<PadraoComboFiltro>();

        this.Marca1 = new Array<PadraoComboFiltro>();
        this.Marca2 = new Array<PadraoComboFiltro>();
        this.Marca3 = new Array<PadraoComboFiltro>();
        this.Marca4 = new Array<PadraoComboFiltro>();
        this.Marca5 = new Array<PadraoComboFiltro>();

        this.Marca6 = new Array<PadraoComboFiltro>();
        this.Marca7 = new Array<PadraoComboFiltro>();
        this.Marca8 = new Array<PadraoComboFiltro>();

        
    }

    Target: Array<PadraoComboFiltro>;
    Regiao: Array<PadraoComboFiltro>;
    Demografico: Array<PadraoComboFiltro>;
    Onda: Array<PadraoComboFiltro>;
    Marca: Array<PadraoComboFiltro>;

    Onda1: Array<PadraoComboFiltro>;
    Onda2: Array<PadraoComboFiltro>;
    Onda3: Array<PadraoComboFiltro>;
    Onda4: Array<PadraoComboFiltro>;

    Marca1: Array<PadraoComboFiltro>;
    Marca2: Array<PadraoComboFiltro>;
    Marca3: Array<PadraoComboFiltro>;
    Marca4: Array<PadraoComboFiltro>;
    Marca5: Array<PadraoComboFiltro>;

    Marca6: Array<PadraoComboFiltro>;
    Marca7: Array<PadraoComboFiltro>;
    Marca8: Array<PadraoComboFiltro>;

    CodUser: number;
    CodIdioma: number;

    TituloGrafico: string;

    ParamTipo:number;
    ParamOndaAtual:number;
    ParamBIA :number;

    ParamDenominators:number;
}

export class FiltroPadraoFullLoad {
    FiltroPadraoColuna1: FiltroPadrao;
    FiltroPadraoColuna2: FiltroPadrao;
    FiltroPadraoColuna3: FiltroPadrao;
    FiltroPadraoColuna4: FiltroPadrao;
    FiltroPadraoColuna5: FiltroPadrao;
}


export class FiltroPadraoExcelDuplo {

    constructor() {
        this.Target = new Array<PadraoComboFiltro>();
        this.Regiao = new Array<PadraoComboFiltro>();
        this.Demografico = new Array<PadraoComboFiltro>();
        this.Onda = new Array<PadraoComboFiltro>();
        this.Marca = new Array<PadraoComboFiltro>();

        this.OndaDuploColuna1 = new PadraoComboFiltro();
        this.OndaDuploColuna1_2 = new PadraoComboFiltro();

        this.OndaDuploColuna2 = new PadraoComboFiltro();
        this.OndaDuploColuna2_2 = new PadraoComboFiltro();

        this.OndaDuploColuna3 = new PadraoComboFiltro();
        this.OndaDuploColuna3_2 = new PadraoComboFiltro();

        this.OndaDuploColuna4 = new PadraoComboFiltro();
        this.OndaDuploColuna4_2 = new PadraoComboFiltro();

        this.OndaDuploColuna5 = new PadraoComboFiltro();
        this.OndaDuploColuna5_2 = new PadraoComboFiltro();

        this.MarcaDuploColuna1 = new PadraoComboFiltro();
        this.MarcaDuploColuna2 = new PadraoComboFiltro();
        this.MarcaDuploColuna3 = new PadraoComboFiltro();
        this.MarcaDuploColuna4 = new PadraoComboFiltro();
        this.MarcaDuploColuna5 = new PadraoComboFiltro();
    }

    Target: Array<PadraoComboFiltro>;
    Regiao: Array<PadraoComboFiltro>;
    Demografico: Array<PadraoComboFiltro>;
    Onda: Array<PadraoComboFiltro>;
    Marca: Array<PadraoComboFiltro>;

    // Filtros de Marca para utilização da geração do Excel Grafico Comparativo Marcas 
    OndaDuploColuna1: PadraoComboFiltro;
    OndaDuploColuna1_2: PadraoComboFiltro;
    OndaDuploColuna1_3: PadraoComboFiltro;

    OndaDuploColuna2: PadraoComboFiltro;
    OndaDuploColuna2_2: PadraoComboFiltro;
    OndaDuploColuna2_3: PadraoComboFiltro;

    OndaDuploColuna3: PadraoComboFiltro;
    OndaDuploColuna3_2: PadraoComboFiltro;
    OndaDuploColuna3_3: PadraoComboFiltro;

    OndaDuploColuna4: PadraoComboFiltro;
    OndaDuploColuna4_2: PadraoComboFiltro;
    OndaDuploColuna4_3: PadraoComboFiltro;

    OndaDuploColuna5: PadraoComboFiltro;
    OndaDuploColuna5_2: PadraoComboFiltro;
    OndaDuploColuna5_3: PadraoComboFiltro;

    // Filtros de Marca para utilização da geração do Excel Grafico Comparativo Marcas 
    MarcaDuploColuna1: PadraoComboFiltro;
    MarcaDuploColuna2: PadraoComboFiltro;
    MarcaDuploColuna3: PadraoComboFiltro;
    MarcaDuploColuna4: PadraoComboFiltro;
    MarcaDuploColuna5: PadraoComboFiltro;


    CodUser: number;
    CodIdioma: number;

    TituloGrafico: string;
}

