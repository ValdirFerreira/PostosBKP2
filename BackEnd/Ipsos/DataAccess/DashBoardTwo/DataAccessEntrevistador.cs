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
    public class DataAccessEntrevistador
    {
        private readonly string usuarioEmail = string.Empty;

        public DataAccessEntrevistador(string usuario)
        {
            usuarioEmail = usuario;
        }



        public List<ProprietarioDTO> EntrevistadorConsultar(int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                //using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                //{
                //    var parametros = new DynamicParameters();
                //    parametros.Add("@ParamCodIdioma", codIdioma);

                //    resultado = conexaoBD
                //        .Query<ProprietarioDTO>(
                //            "prProprietarioConsultar",
                //            parametros,
                //            commandType: CommandType.StoredProcedure,
                //            commandTimeout: 300
                //        ).ToList();
                //}
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


        public List<ProprietarioDTO> EntrevistadorConsultarPeloID(int cod, int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                //using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                //{
                //    var parametros = new DynamicParameters();
                //    parametros.Add("@ParamCod", cod);
                //    parametros.Add("@ParamCodIdioma", codIdioma);

                //    resultado = conexaoBD
                //        .Query<ProprietarioDTO>(
                //            "prProprietarioConsultarPeloID",
                //            parametros,
                //            commandType: CommandType.StoredProcedure,
                //            commandTimeout: 300
                //        ).ToList();
                //}
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


        public ResponseCad EntrevistadorCadastrar(ProprietarioCadastrarRequest req)
        {

            var response = new ResponseCad();

            int novoId = 0;

            try
            {
                //using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                //{


                //        if (req.Cod == 0)
                //        {
                //            var parametros = new DynamicParameters();
                //            parametros.Add("@ParamNome", req.Nome);
                //            parametros.Add("@ParamDocumento", Regex.Replace(req.Documento ?? "", "[^0-9]", ""));
                //            parametros.Add("@ParamStatus", req.Status);
                //            parametros.Add("@ParamTelefone",
                //Regex.Replace(req.Telefone ?? "", "[^0-9]", ""));
                //            parametros.Add("@ParamEmail", req.Email);

                //            novoId = conexaoBD.ExecuteScalar<int>(
                //                "prProprietarioCadastrar",
                //                parametros,
                //                commandType: CommandType.StoredProcedure,
                //                commandTimeout: 300
                //            );
                //        }
                //        else
                //        {
                //            var parametros = new DynamicParameters();
                //            parametros.Add("@ParamCod", req.Cod);
                //            parametros.Add("@ParamNome", req.Nome);
                //            parametros.Add("@ParamDocumento", Regex.Replace(req.Documento ?? "", "[^0-9]", ""));
                //            parametros.Add("@ParamCodStatus", req.Status);
                //            parametros.Add("@ParamTelefone",
                // Regex.Replace(req.Telefone ?? "", "[^0-9]", ""));
                //            parametros.Add("@ParamEmail", req.Email);

                //            conexaoBD.ExecuteScalar<int>(
                //                  "prProprietarioAtualizar",
                //                  parametros,
                //                  commandType: CommandType.StoredProcedure,
                //                  commandTimeout: 300
                //              );

                //            novoId = req.Cod;
                //        }
                //    }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                if (ex is SqlException sqlEx)
                {
                    response.Info = SqlErrorTranslator.Translate(sqlEx);
                }
                else
                {
                    response.Info = "Ocorreu um erro inesperado. Tente novamente.";
                }
            }



            response.Cod = novoId;

            return response;
        }






    }
}
