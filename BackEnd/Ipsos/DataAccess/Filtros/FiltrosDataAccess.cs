using Business.TrataDados;
using Dapper;
using DataAccess.Config;
using Entities.Filtros;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data;
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


        public List<PadraoComboFiltro> FiltroStatus(ParamFiltro filtro)
        {
            var retorno = new List<PadraoComboFiltro>();

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamCodIdioma", filtro.ParamCodIdioma);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var lista = conexaoBD
                        .Query("prFiltroStatus",
                               parametros,
                               commandType: CommandType.StoredProcedure)
                        .ToList();

                    retorno = lista.Select(x => new PadraoComboFiltro
                    {
                        IdItem = (int)x.CodStatus,
                        DescItem = (string)x.Descricao
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name,
                                       System.Reflection.MethodBase.GetCurrentMethod().Name,
                                       ex.Message);
            }

            return retorno;
        }

        public List<PadraoComboFiltro> FiltroPostos(ParamFiltroPostos filtro)
        {
            var retorno = new List<PadraoComboFiltro>();

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamTextoBuscado", filtro.ParamTextoBuscado);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var lista = conexaoBD
                        .Query("prFiltroPostos",
                               parametros,
                               commandType: CommandType.StoredProcedure)
                        .ToList();

                    retorno = lista.Select(x => new PadraoComboFiltro
                    {
                        IdItem = (int)x.Cod,
                        DescItem = (string)x.Descricao
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name,
                                       System.Reflection.MethodBase.GetCurrentMethod().Name,
                                       ex.Message);
            }

            return retorno;
        }

        public List<PadraoComboFiltro> FiltroFuncionarioFuncoes(ParamFiltro filtro)
        {
            var retorno = new List<PadraoComboFiltro>();

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamCodIdioma", filtro.ParamCodIdioma);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var lista = conexaoBD
                        .Query("prFiltroFuncionarioFuncoes",
                               parametros,
                               commandType: CommandType.StoredProcedure)
                        .ToList();

                    retorno = lista.Select(x => new PadraoComboFiltro
                    {
                        IdItem = (int)x.CodFuncionarioFuncao,
                        DescItem = (string)x.Descricao
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name,
                                       System.Reflection.MethodBase.GetCurrentMethod().Name,
                                       ex.Message);
            }

            return retorno;
        }

        public List<PadraoComboFiltro> FiltroTipoPessoa(ParamFiltro filtro)
        {
            var retorno = new List<PadraoComboFiltro>();

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamCodIdioma", filtro.ParamCodIdioma);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var lista = conexaoBD
                        .Query("prFiltroTipoPessoa",
                               parametros,
                               commandType: CommandType.StoredProcedure)
                        .ToList();

                    retorno = lista.Select(x => new PadraoComboFiltro
                    {
                        IdItem = (int)x.CodTipoPessoa,
                        DescItem = (string)x.Descricao
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name,
                                       System.Reflection.MethodBase.GetCurrentMethod().Name,
                                       ex.Message);
            }

            return retorno;
        }


    }
}
