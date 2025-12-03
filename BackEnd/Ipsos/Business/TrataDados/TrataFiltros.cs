using Dapper;
using Entities.Filtros;
using Entities.Parametros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.TrataDados
{
    public class TrataFiltros
    {
        public DynamicParameters MontaParametrosFiltroPadrao(FiltroPadrao filtro)
        {

            if (filtro.Onda[0] == null)
            {
                filtro.Onda = null;
            }



            var parametros = new DynamicParameters();
            parametros.Add("@ParamListaTarget", filtro.Target == null ? "" : string.Join(",", filtro.Target.Select(s => string.Concat(s.IdItem))));

            //parametros.Add("@ParamListaTarget", (filtro.Target == null || filtro.Target.FirstOrDefault() == null)  ? "" : string.Join(",", filtro.Target.Select(s => string.Concat(s.IdItem))));
            parametros.Add("@ParamListaRegiao", filtro.Regiao == null ? "" : string.Join(",", filtro.Regiao.Select(s => string.Concat(s.IdItem))));
            parametros.Add("@ParamListaRegiaoTipo", filtro.Regiao == null ? "" : string.Join(",", filtro.Regiao.Select(s => string.Concat(s.Tipo))));
            parametros.Add("@ParamListaDemografico", filtro.Demografico == null ? "" : string.Join(",", filtro.Demografico.Select(s => string.Concat(s.IdItem))));
            parametros.Add("@ParamListaDemograficoTipo", filtro.Demografico == null ? "" : string.Join(",", filtro.Demografico.Select(s => string.Concat(s.Tipo))));
            parametros.Add("@ParamListaOnda", filtro.Onda == null ? "" : string.Join(",", filtro.Onda.Select(s => string.Concat(s.IdItem))));
            parametros.Add("@ParamListaMarca", filtro.Marca == null ? "" : string.Join(",", filtro.Marca.Select(s => string.Concat(s.IdItem))));

            parametros.Add("@ParamCodUser", filtro.CodUser);
            parametros.Add("@ParamCodIdioma", filtro.CodIdioma);
            parametros.Add("@ParamSequencia", filtro.Sequencia);
            //parametros.Add("@ParamBIA", filtro.ParamBIA);           

            return parametros;
        }
               
    }
}
