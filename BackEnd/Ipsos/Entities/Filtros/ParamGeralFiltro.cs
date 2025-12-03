using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Filtros
{
    public  class ParamGeralFiltro
    {
        public int CodOndaParam { get; set; }
        public int CodUserParam { get; set; }
        public int CodIdiomaParam { get; set; }

        public List<PadraoComboFiltro> Regiao { get; set; }

        public int ParamBIA { get; set; }

        public int ParamDenominators { get; set; }

        public int ParamTipoChocolate { get; set; }

        public int CodBlocoParam { get; set; }

        public int ParamTarget { get; set; }

    }
}
