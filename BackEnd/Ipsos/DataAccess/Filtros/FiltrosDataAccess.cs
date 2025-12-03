using Business.TrataDados;
using Dapper;
using DataAccess.Config;
using Entities.Filtros;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Filtros
{
    public class FiltrosDataAccess
    {
        private readonly string usuarioEmail = string.Empty;

        public FiltrosDataAccess(string usuario)
        {
            usuarioEmail = usuario;
        }

        public List<PadraoComboFiltro> FiltroTarget(ParamGeralFiltro filtro)
        {
            var retorno = new List<PadraoComboFiltro>();

            //try
            //{
            //    var TrataFiltros = new TrataFiltros();
            //    var parametros = TrataFiltros.MontaParametrosFiltros(filtro);

            //    using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
            //    {
            //        retorno = conexaoBD.Query<PadraoComboFiltro>("sp_FiltroTarget", parametros, null, true, 300, System.Data.CommandType.StoredProcedure).ToList();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
            //}

            return retorno;

        }

      

    }
}
