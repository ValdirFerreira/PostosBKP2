using Dapper;
using DataAccess.Config;
using Entities.DTOs;
using Entities.Parametros;
using Helpers.Logtxt;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Linq;
using DataAccess.FilesConfig;
using System.Text.RegularExpressions;

namespace DataAccess.DashBoardTwo
{
    public class DataAccessPesquisa
    {
        private readonly string usuarioEmail = string.Empty;

        public DataAccessPesquisa(string usuario)
        {
            usuarioEmail = usuario;
        }



        public List<PesquisaQuestaoListagemResponse> ConsultarPesquisaQuestoes(PesquisaRequest request)
        {
            var retorno = new List<PesquisaQuestaoListagemResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodSegmento", request.CodSegmento);
                    parametros.Add("@ParamCodIdioma", request.CodIdioma);

                    var result = conexaoBD.Query<PesquisaQuestaoListagemResponse>(
                        "prPesquisaListagemQuestoes",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    retorno = result.ToList();

                    foreach (var item in retorno)
                    {
                        var listOpcoes = ConsultarPesquisaQuestaoOpcoes(
                            item.CodPesquisaListagemQuestao,
                            request.CodIdioma
                        );

                        if (listOpcoes.Any())
                        {
                            item.ListOpcoes.AddRange(listOpcoes);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );
            }

            return retorno;
        }


        public List<PesquisaQuestaoOpcaoResponse> ConsultarPesquisaQuestaoOpcoes(
    int codListagemQuestao,
    int codIdioma
)
        {
            var retorno = new List<PesquisaQuestaoOpcaoResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodListagemQuestao", codListagemQuestao);
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    var result = conexaoBD.Query<PesquisaQuestaoOpcaoResponse>(
                        "prPesquisaQuestaoOpcoes",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    retorno = result.ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );
            }

            return retorno;
        }


        public PesquisaVerificaRespostaResponse VerificarPesquisaResposta(string documento)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamDocumento", documento);

                    var result = conexaoBD.QueryFirstOrDefault<PesquisaVerificaRespostaResponse>(
                        "prPesquisaVerificaResposta",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    return result;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                return null;
            }
        }


        public PesquisaRespostaCadastrarResponse CadastrarPesquisaResposta(
    PesquisaRespostaCadastrarRequest model
)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamRespostas", model.ParamRespostas);
                    parametros.Add("@ParamCodSegmento", model.ParamCodSegmento);
                    parametros.Add("@ParamClienteDocumento", model.ParamClienteDocumento);

                    var result = conexaoBD.QueryFirstOrDefault<PesquisaRespostaCadastrarResponse>(
                        "prPesquisaRespostaCadastrar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );



                    return result;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                return new PesquisaRespostaCadastrarResponse { ErroCadastro = 0 };
            }
        }


    }
}
