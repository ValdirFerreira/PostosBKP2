using Dapper;
using DataAccess.Config;
using Entities.TraducaoIdioma;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Traducao
{
    public class TraducaoDataAccess
    {
        private readonly string usuarioEmail = string.Empty;

        public TraducaoDataAccess(string usuario)
        {
            usuarioEmail = usuario;
        }


        public IDictionary<string, string> ObterTraducao(LangViewModel lang)
        {

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@idiomaId", lang.IdLang);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var list = conexaoBD.Query<TraducaoIdiomaModel>("pr_Lista_Traducao", parametros, null, false, 300, System.Data.CommandType.StoredProcedure).ToList();

                    IDictionary<string, string> dic1 = new Dictionary<string, string>();
                    foreach (var item in list)
                    {
                        try
                        {
                            dic1.Add(item.objeto, item.valor);
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                    return dic1;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
            }

            return null;

        }



        public List<TraducaoComponente> ObtemTraducoes()
        {
            var retorno = new List<TraducaoComponente>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var query = string.Empty;

                    query = "SELECT Objeto,Texto FROM tblTraducaoComponenteObjetoTraducao";

                    retorno = conexaoBD.Query<TraducaoComponente>(query).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
            }

            return retorno;
        }
    }
}
