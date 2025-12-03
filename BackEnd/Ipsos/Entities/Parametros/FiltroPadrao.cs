using Entities.Filtros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Parametros
{
    public class FiltroPadrao
    {
        public List<PadraoComboFiltro> Target { get; set; }

        public List<PadraoComboFiltro> Regiao { get; set; }

        public List<PadraoComboFiltro> Demografico { get; set; }

        public List<PadraoComboFiltro> Onda { get; set; }

        public List<PadraoComboFiltro> Marca { get; set; }

        public int CodUser { get; set; }

        public int CodIdioma { get; set; }

        public int Sequencia { get; set; }

        public int Atributo { get; set; }

        public string TituloGrafico { get; set; }

        public int ParamTipo { get; set; }

        public int ParamOndaAtual { get; set; }

        public int ParamSTB { get; set; }
        public int ParamBIA { get; set; }

        public int ParamDenominators { get; set; }

    }

    public class FiltroPadraoExcel
    {
        public List<PadraoComboFiltro> Target { get; set; }
        public List<PadraoComboFiltro> Regiao { get; set; }
        public List<PadraoComboFiltro> Demografico { get; set; }
        public List<PadraoComboFiltro> Onda { get; set; }
        public List<PadraoComboFiltro> Marca { get; set; }

        public List<PadraoComboFiltro> Onda1 { get; set; }
        public List<PadraoComboFiltro> Onda2 { get; set; }
        public List<PadraoComboFiltro> Onda3 { get; set; }
        public List<PadraoComboFiltro> Onda4 { get; set; }

        public List<PadraoComboFiltro> Marca1 { get; set; }
        public List<PadraoComboFiltro> Marca2 { get; set; }
        public List<PadraoComboFiltro> Marca3 { get; set; }
        public List<PadraoComboFiltro> Marca4 { get; set; }
        public List<PadraoComboFiltro> Marca5 { get; set; }

        public List<PadraoComboFiltro> Marca6 { get; set; }
        public List<PadraoComboFiltro> Marca7 { get; set; }
        public List<PadraoComboFiltro> Marca8 { get; set; }

        public int CodUser { get; set; }

        public int CodIdioma { get; set; }

        public string TituloGrafico { get; set; }

        public int ParamTipo { get; set; }

        public int ParamOndaAtual { get; set; }

        public int ParamBIA { get; set; }

        public int ParamDenominators { get; set; }
    }


    public class FiltroPadraoExcelDuplo
    {
        public List<PadraoComboFiltro> Target { get; set; }
        public List<PadraoComboFiltro> Regiao { get; set; }
        public List<PadraoComboFiltro> Demografico { get; set; }
        public List<PadraoComboFiltro> Onda { get; set; }
        public List<PadraoComboFiltro> Marca { get; set; }

        public PadraoComboFiltro OndaDuploColuna1 { get; set; }
        public PadraoComboFiltro OndaDuploColuna1_2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna1_3 { get; set; }

        public PadraoComboFiltro OndaDuploColuna2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna2_2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna2_3 { get; set; }

        public PadraoComboFiltro OndaDuploColuna3 { get; set; }
        public PadraoComboFiltro OndaDuploColuna3_2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna3_3 { get; set; }

        public PadraoComboFiltro OndaDuploColuna4 { get; set; }
        public PadraoComboFiltro OndaDuploColuna4_2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna4_3 { get; set; }

        public PadraoComboFiltro OndaDuploColuna5 { get; set; }
        public PadraoComboFiltro OndaDuploColuna5_2 { get; set; }
        public PadraoComboFiltro OndaDuploColuna5_3 { get; set; }

        public PadraoComboFiltro MarcaDuploColuna1 { get; set; }
        public PadraoComboFiltro MarcaDuploColuna2 { get; set; }
        public PadraoComboFiltro MarcaDuploColuna3 { get; set; }
        public PadraoComboFiltro MarcaDuploColuna4 { get; set; }
        public PadraoComboFiltro MarcaDuploColuna5 { get; set; }

        public int CodUser { get; set; }

        public int CodIdioma { get; set; }

        public string TituloGrafico { get; set; }
    }
    public class FiltroPadraoFullLoad
    {
        public FiltroPadrao FiltroPadraoColuna1 { get; set; }
        public FiltroPadrao FiltroPadraoColuna2 { get; set; }
        public FiltroPadrao FiltroPadraoColuna3 { get; set; }
        public FiltroPadrao FiltroPadraoColuna4 { get; set; }
        public FiltroPadrao FiltroPadraoColuna5 { get; set; }
    }

}
