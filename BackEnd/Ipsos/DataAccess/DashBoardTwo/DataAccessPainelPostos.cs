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

namespace DataAccess.DashBoardTwo
{
    public class DataAccessPainelPostos
    {
        private readonly string usuarioEmail = string.Empty;

        public DataAccessPainelPostos(string usuario)
        {
            usuarioEmail = usuario;
        }



        public List<ProprietarioDTO> ProprietarioConsultar(int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    resultado = conexaoBD
                        .Query<ProprietarioDTO>(
                            "prProprietarioConsultar",
                            parametros,
                            commandType: CommandType.StoredProcedure,
                            commandTimeout: 300
                        ).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    $"[ProprietarioConsultar] {ex.Message}"
                );
            }

            return resultado;
        }


        public List<ProprietarioDTO> ProprietarioConsultarPeloID(int cod, int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCod", cod);
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    resultado = conexaoBD
                        .Query<ProprietarioDTO>(
                            "prProprietarioConsultarPeloID",
                            parametros,
                            commandType: CommandType.StoredProcedure,
                            commandTimeout: 300
                        ).ToList();
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    $"[ProprietarioConsultar] {ex.Message}"
                );
            }

            return resultado;
        }


        public int ProprietarioCadastrar(ProprietarioCadastrarRequest req)
        {
            int novoId = 0;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {


                    if (req.Cod == 0)
                    {
                        var parametros = new DynamicParameters();
                        parametros.Add("@ParamNome", req.Nome);
                        parametros.Add("@ParamDocumento", req.Documento);
                        parametros.Add("@ParamStatus", req.Status);
                        parametros.Add("@ParamTelefone", req.Telefone);
                        parametros.Add("@ParamEmail", req.Email);

                        novoId = conexaoBD.ExecuteScalar<int>(
                            "prProprietarioCadastrar",
                            parametros,
                            commandType: CommandType.StoredProcedure,
                            commandTimeout: 300
                        );
                    }
                    else
                    {
                        var parametros = new DynamicParameters();
                        parametros.Add("@ParamCod", req.Cod);
                        parametros.Add("@ParamNome", req.Nome);
                        parametros.Add("@ParamDocumento", req.Documento);
                        parametros.Add("@ParamCodStatus", req.Status);
                        parametros.Add("@ParamTelefone", req.Telefone);
                        parametros.Add("@ParamEmail", req.Email);

                        novoId = conexaoBD.ExecuteScalar<int>(
                            "prProprietarioAtualizar",
                            parametros,
                            commandType: CommandType.StoredProcedure,
                            commandTimeout: 300
                        );
                    }
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    $"[ProprietarioCadastrar] {ex.Message}"
                );
            }

            return novoId;
        }

    }
}
