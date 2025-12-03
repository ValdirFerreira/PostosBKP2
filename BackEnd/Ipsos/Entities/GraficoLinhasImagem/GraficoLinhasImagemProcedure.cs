using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.GraficoLinhasImagem
{
    public class GraficoLinhasImagemProcedure
    {
        public int CodMarca { get; set; }
        public string DescMarca { get; set; }
        public string CorSiteMarca { get; set; }
        public decimal Resposta { get; set; }
        public string Descricao { get; set; }
        public decimal PercAtual { get; set; }
        public decimal PercAnterior { get; set; }
        public string TestSig { get; set; }
        public int TipoDados { get; set; }

        public decimal Base { get; set; }
        public decimal Media { get; set; }

        public string BaseMinima { get; set; }

        public decimal BaseAnt { get; set; }

        public decimal MediaAnt { get; set; }

        public string BaseMinimaAnt { get; set; }
    }


    public class GraficoLinhasImagem
    {

        public GraficoLinhasImagem()
        {
            GraficoLinhasImagem1 = new List<GraficoLinhasImagemProcedure>();
            GraficoLinhasImagem2 = new List<GraficoLinhasImagemProcedure>();
            GraficoLinhasImagem3 = new List<GraficoLinhasImagemProcedure>();
            GraficoLinhasImagem4 = new List<GraficoLinhasImagemProcedure>();
            GraficoLinhasImagem5 = new List<GraficoLinhasImagemProcedure>();
        }

        public List<GraficoLinhasImagemProcedure> GraficoLinhasImagem1 { get; set; }
        public List<GraficoLinhasImagemProcedure> GraficoLinhasImagem2 { get; set; }
        public List<GraficoLinhasImagemProcedure> GraficoLinhasImagem3 { get; set; }
        public List<GraficoLinhasImagemProcedure> GraficoLinhasImagem4 { get; set; }
        public List<GraficoLinhasImagemProcedure> GraficoLinhasImagem5 { get; set; }
    }


}
