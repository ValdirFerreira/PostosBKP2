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
using System.Threading.Tasks;
using System.Collections;
using DataAccess.Usuario;
using Entities.Usuario;

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


        public ResponseCad ProprietarioCadastrar(ProprietarioCadastrarRequest req)
        {

            var response = new ResponseCad();

            UsuarioDataAccess _context = new UsuarioDataAccess("");

            int novoId = 0;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {


                    if (req.Cod == 0)
                    {
                        var parametros = new DynamicParameters();
                        parametros.Add("@ParamNome", req.Nome);
                        parametros.Add("@ParamDocumento", Regex.Replace(req.Documento ?? "", "[^0-9]", ""));
                        parametros.Add("@ParamStatus", req.Status);
                        parametros.Add("@ParamTelefone",
            Regex.Replace(req.Telefone ?? "", "[^0-9]", ""));
                        parametros.Add("@ParamEmail", req.Email);

                        novoId = conexaoBD.ExecuteScalar<int>(
                            "prProprietarioCadastrar",
                            parametros,
                            commandType: CommandType.StoredProcedure,
                            commandTimeout: 300
                        );

                        _context.InsertUser(new UsuarioModel { Name = req.Nome, Email = req.Email });

                    }
                    else
                    {
                        var parametros = new DynamicParameters();
                        parametros.Add("@ParamCod", req.Cod);
                        parametros.Add("@ParamNome", req.Nome);
                        parametros.Add("@ParamDocumento", Regex.Replace(req.Documento ?? "", "[^0-9]", ""));
                        parametros.Add("@ParamCodStatus", req.Status);
                        parametros.Add("@ParamTelefone",
             Regex.Replace(req.Telefone ?? "", "[^0-9]", ""));
                        parametros.Add("@ParamEmail", req.Email);

                        conexaoBD.ExecuteScalar<int>(
                              "prProprietarioAtualizar",
                              parametros,
                              commandType: CommandType.StoredProcedure,
                              commandTimeout: 300
                          );

                        novoId = req.Cod;
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

        public ResponseCad AtualizarStatusProprietario(int codProprietario, int novoStatus)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    string sql = @"
                UPDATE tblProprietarios
                SET CodStatus = @Status
                WHERE CodProprietario = @Cod";

                    var parametros = new DynamicParameters();
                    parametros.Add("@Status", novoStatus);
                    parametros.Add("@Cod", codProprietario);

                    int linhasAfetadas = conexaoBD.Execute(sql, parametros);

                    if (linhasAfetadas > 0)
                        response.Cod = codProprietario;
                    else
                        response.Info = "Nenhum registro encontrado para atualizar.";
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

            return response;
        }


        public bool ProprietarioFileCadastrar(FilePostos req)
        {

            try
            {
                SaveFiles saveFiles = new SaveFiles();
                saveFiles.SalvaArquivo(req);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }


        public FilePostos RecuperaArquivo(FilePostos req)
        {

            try
            {
                SaveFiles saveFiles = new SaveFiles();
                return saveFiles.RecuperaArquivo(req.Cod);
            }
            catch (Exception ex)
            {
                return null;
            }


        }



        ////////////////////////////////////////////////////////////////////////
        //// FUNCIONARIOS / POSTOS
        ////////////////////////////////////////////////////////////////////////

        public List<ProprietarioDTO> ConsultarFuncionariosDap(int codPosto, int codIdioma)
        {
            var resultado = new List<ProprietarioDTO>();

            try
            {
                var list = ConsultarFuncionarios(codPosto, codIdioma);

                foreach (var item in list)
                {
                    resultado.Add(new ProprietarioDTO
                    {
                        Cod = item.CodPostoFuncionario,
                        CodStatus = item.CodStatus,
                        DescricaoStatus = item.Status,
                        Funcao = item.DescricaoFuncao,
                        Nome = item.Nome,
                        Email = item.Email,
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

        public ResponseCad CadastrarFuncionario(PostoFuncionarioCadastrarRequest req)
        {
            var response = new ResponseCad();
            int novoId = 0;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCodPosto", req.ParamCodPosto);
                    parametros.Add("@ParamCodFuncionarioFuncao", req.ParamCodFuncionarioFuncao);
                    parametros.Add("@ParamCodStatus", req.ParamCodStatus);
                    parametros.Add("@ParamNome", req.ParamNome?.Trim());
                    parametros.Add("@ParamEmail", req.ParamEmail?.Trim());

                    novoId = conexaoBD.ExecuteScalar<int>(
                        "prPostoFuncionarioCadastrar",
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

        public ResponseCad AtualizarFuncionario(PostoFuncionarioCadastrarRequest req)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    // ID obrigatório
                    parametros.Add("@ParamCod", req.ParamCodFuncionarioFuncao);

                    // Somente serão atualizados se vierem preenchidos > 0 ou não nulos
                    parametros.Add("@ParamCodFuncionarioFuncao", req.ParamCodFuncionarioFuncao);

                    parametros.Add("@ParamCodStatus",
                        req.ParamCodStatus);

                    parametros.Add("@ParamNome",
                        string.IsNullOrWhiteSpace(req.ParamNome) ? null : req.ParamNome.Trim());

                    parametros.Add("@ParamEmail",
                        string.IsNullOrWhiteSpace(req.ParamEmail) ? null : req.ParamEmail.Trim());

                    conexaoBD.Execute(
                        "prPostoFuncionarioAtualizar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
                }

                response.Cod = req.ParamCodFuncionarioFuncao; // sucesso
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                response.Cod = 0; // erro
            }

            return response;
        }

        public List<PostoFuncionarioConsultarResponse> ConsultarFuncionarios(int codPosto, int codIdioma)
        {
            var lista = new List<PostoFuncionarioConsultarResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCodPosto", codPosto);
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    var result = conexaoBD.Query<PostoFuncionarioConsultarResponse>(
                        "prPostoFuncionarioConsultar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    lista = result.ToList();
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

            return lista;
        }

        public PostoFuncionarioConsultarResponse ConsultarFuncionarioPeloID(int cod, int codIdioma)
        {
            var retorno = new PostoFuncionarioConsultarResponse();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCod", cod);
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    retorno = conexaoBD.QueryFirstOrDefault<PostoFuncionarioConsultarResponse>(
                        "prPostoFuncionarioConsultarPeloID",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
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

        public ResponseCad ExcluirFuncionario(int cod)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCod", cod);

                    conexaoBD.Execute(
                        "prPostoFuncionarioExcluir",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );
                }

                response.Cod = 1; // sucesso
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    ex.ToString()
                );

                response.Cod = 0; // erro
            }

            return response;
        }


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///

        public ResponseCad CadastrarAssociacao(PostoAssociacaoCadastrarRequest req)
        {
            var response = new ResponseCad();
            int novoId = 0;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCodProprietario", req.ParamCodProprietario);
                    parametros.Add("@ParamCodPosto", req.ParamCodPosto);

                    novoId = conexaoBD.ExecuteScalar<int>(
                        "prAssociacaoPostoCadastrar",
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


        public ResponseCad AtualizarAssociacao(PostoAssociacaoAtualizarRequest req)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();

                    parametros.Add("@ParamCod", req.ParamCod);
                    parametros.Add("@ParamCodProprietario", req.ParamCodProprietario);
                    parametros.Add("@ParamCodPosto", req.ParamCodPosto);
                    parametros.Add("@ParamCodStatus", req.ParamCodStatus);

                    conexaoBD.Execute(
                        "prAssociacaoPostoAtualizar",
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

        public ResponseCad ExcluirAssociacao(int cod)
        {
            var response = new ResponseCad();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCod", cod);

                    conexaoBD.Execute(
                        "prAssociacaoPostoExcluir",
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


        public List<AssociacaoPostoConsultarResponse> ConsultarAssociacoes(Postos model)
        {
            var lista = new List<AssociacaoPostoConsultarResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodProprietario", model.Cod);
                    parametros.Add("@ParamCodIdioma", model.CodIdioma);


                    var result = conexaoBD.Query<AssociacaoPostoConsultarResponse>(
                        "prAssociacaoPostoConsultar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    lista = result.ToList();
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

            return lista;
        }


        public List<AssociacaoPostoConsultarPeloIDResponse> ConsultarAssociacaoPeloID(int cod)
        {
            var retorno = new List<AssociacaoPostoConsultarPeloIDResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCod", cod);


                    var result = conexaoBD.Query<AssociacaoPostoConsultarPeloIDResponse>(
                        "prAssociacaoPostoConsultarPeloID",
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


        public PostoDadosResponse ConsultarPostoPeloID(int cod)
        {
            var retorno = new PostoDadosResponse();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCod", cod);

                    var result = conexaoBD.Query<PostoDadosResponse>(
                        "prPostoConsultarPeloID",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    retorno = result.FirstOrDefault();
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

        /// <summary>
        /// //////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="codIdioma"></param>
        /// <returns></returns>

        public List<PostoServicoConsultarResponse> ConsultarPostoServico(Postos model)
        {
            var retorno = new List<PostoServicoConsultarResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodIdioma", model.CodIdioma);

                    var result = conexaoBD.Query<PostoServicoConsultarResponse>(
                        "prPostoServicoConsultar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    retorno = result.ToList();

                    foreach (var item in retorno)
                    {
                        var listOpcoes = ConsultarPostoServicoOpcao(item.CodPostoServico, model.Cod, model.CodIdioma);
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


        public List<PostoServicoOpcaoConsultarResponse> ConsultarPostoServicoOpcao(int codServico, int codPosto, int codIdioma)
        {
            var retorno = new List<PostoServicoOpcaoConsultarResponse>();

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodServico", codServico);
                    parametros.Add("@ParamCodPosto", codPosto);
                    parametros.Add("@ParamCodIdioma", codIdioma);

                    var result = conexaoBD.Query<PostoServicoOpcaoConsultarResponse>(
                        "prPostoServicoOpcaoConsultar",
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




        public bool AtualizarPostoServicoOpcao(PostoServicoOpcaoAtualizarRequest req)
        {
            bool sucesso = false;

            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var parametros = new DynamicParameters();
                    parametros.Add("@ParamCodServicoOpcao", req.CodServicoOpcao);
                    parametros.Add("@ParamCodServico", req.CodServico);
                    parametros.Add("@ParamCodPosto", req.CodPosto);
                    parametros.Add("@ParamCodIdioma", req.CodIdioma);

                    conexaoBD.Execute(
                        "prPostoServicoOpcaoAtualizar",
                        parametros,
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300
                    );

                    sucesso = true;
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

            return sucesso;
        }





    }
}
