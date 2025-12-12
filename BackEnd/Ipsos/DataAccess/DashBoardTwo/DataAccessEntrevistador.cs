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
                var list = ConsultarEntrevistadores(codIdioma);
                foreach (var item in list)
                {
                    resultado.Add(new ProprietarioDTO
                    {
                        Cod = item.CodEntrevistador,
                        CodStatus = item.CodStatus,
                        DescricaoStatus = item.Status,
                        Documento = item.Documento,
                        Email = item.Email,
                        Nome = item.Nome,
                        Telefone = item.Telefone,
                        Funcao = ""
                    });

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


        public List<ProprietarioDTO> EntrevistadorConsultarPeloID(int cod, int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                var item = ConsultarEntrevistadorPeloID(cod);

                resultado.Add(new ProprietarioDTO
                {
                    Cod = item.CodEntrevistador,
                    CodStatus = item.CodStatus,
                    DescricaoStatus = item.Status,
                    Documento = item.Documento,
                    Email = item.Email,
                    Nome = item.Nome,
                    Telefone = item.Telefone,
                    Funcao = ""
                });
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



                if (req.Cod == 0)
                {
                    var result = CadastrarEntrevistador(new EntrevistadorCadastrarRequest
                    {
                        ParamEmail = req.Email,
                        ParamCodStatus = req.Status,
                        ParamDocumento = req.Documento,
                        ParamNome = req.Nome,
                        ParamTelefone = req.Telefone
                    });

                    novoId = result.Cod;

                }
                else
                {

                    var result = AtualizarEntrevistador(new EntrevistadorAtualizarRequest
                    {
                        ParamEmail = req.Email,
                        ParamCodStatus = req.Status,
                        ParamDocumento = req.Documento,
                        ParamNome = req.Nome,
                        ParamTelefone = req.Telefone,
                        ParamCod = req.Cod
                    });

                    novoId = result.Cod;

                }

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





        public ResponseCad CadastrarEntrevistador(EntrevistadorCadastrarRequest req)
        {
            var response = new ResponseCad();
            int novoId = 0;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamNome", req.ParamNome);
                    parametros.Add("@ParamEmail", req.ParamEmail);
                    parametros.Add("@ParamTelefone", req.ParamTelefone);
                    parametros.Add("@ParamDocumento", req.ParamDocumento);
                    parametros.Add("@ParamCodStatus", req.ParamCodStatus);

                    novoId = conexaoBD.ExecuteScalar<int>(
                        "prEntrevistadorCadastrar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
                }

                response.Cod = novoId;
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                response.Cod = 0;
            }

            return response;
        }

        public ResponseCad AtualizarEntrevistador(EntrevistadorAtualizarRequest req)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCod", req.ParamCod);
                    parametros.Add("@ParamNome", req.ParamNome);
                    parametros.Add("@ParamEmail", req.ParamEmail);
                    parametros.Add("@ParamTelefone", req.ParamTelefone);
                    parametros.Add("@ParamDocumento", req.ParamDocumento);
                    parametros.Add("@ParamCodStatus", req.ParamCodStatus);

                    conexaoBD.Execute(
                        "prEntrevistadorAtualizar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
                }

                response.Cod = 1;
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                response.Cod = 0;
            }

            return response;
        }

        public ResponseCad ExcluirEntrevistador(int cod)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCod", cod);

                    conexaoBD.Execute(
                        "prEntrevistadorExcluir",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
                }

                response.Cod = 1;
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                response.Cod = 0;
            }

            return response;
        }


        public List<EntrevistadorDTO> ConsultarEntrevistadores(int codIdioma)
        {
            using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamCodIdioma", codIdioma);

                var lista = conexaoBD.Query<EntrevistadorDTO>(
                    "prEntrevistadorConsultar",
                    parametros,
                    commandType: CommandType.StoredProcedure,
                    commandTimeout: 300
                ).ToList();

                return lista;
            }
        }

        public EntrevistadorDTO ConsultarEntrevistadorPeloID(int cod)
        {
            using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
            {
                var parametros = new DynamicParameters();
                parametros.Add("@ParamCod", cod);

                var result = conexaoBD.QueryFirstOrDefault<EntrevistadorDTO>(
                    "prEntrevistadorConsultarPeloID",
                    parametros,
                    commandType: CommandType.StoredProcedure,
                    commandTimeout: 300
                );

                return result;
            }
        }


    }
}
