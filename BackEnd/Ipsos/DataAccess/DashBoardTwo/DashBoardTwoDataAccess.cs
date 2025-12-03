using Entities.Parametros;

namespace DataAccess.DashBoardTwo
{
    public class DashBoardTwoDataAccess
    {
        private readonly string usuarioEmail = string.Empty;

        public DashBoardTwoDataAccess(string usuario)
        {
            usuarioEmail = usuario;
        }




        public dynamic CarregarGraficoComparativoMarcas(FiltroPadrao filtro)
        {
            // var retorno = new GraficoColunas();

            //try
            //{
            //    var TrataFiltros = new TrataFiltros();
            //    var parametros = TrataFiltros.MontaParametrosFiltroPadraoDenominator(filtro);


            //    using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
            //    {
            //        var list = conexaoBD.Query<GraficoColunas>("sp_Dashboard_Awareness", parametros, null, false, 300, System.Data.CommandType.StoredProcedure).ToList();

            //        var trataDados = new TrataDadosDashBoardTwo();

            //        if (list.Count > 0)
            //            retorno = list.FirstOrDefault();

            //    }

            //}
            //catch (Exception ex)
            //{
            //    LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
            //}

            //return retorno;

            return null;
        }
    }
}
