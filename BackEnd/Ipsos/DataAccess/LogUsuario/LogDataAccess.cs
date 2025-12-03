using Dapper;
using DataAccess.Config;
using Entities.LogUsuario;
using Entities.Usuario;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

using System.Text;
using System.Threading.Tasks;

namespace DataAccess.LogUsuario
{
    public class LogDataAccess 
    {
        private readonly string usuarioEmail = string.Empty;
        public LogDataAccess(string usuario)
        {
            usuarioEmail = usuario;
        }


      

        public int InsertLog(LogUsuarioModel logUsuarioModel)
        {
            try
            {               


                if (logUsuarioModel.CodUser > 0)
                {
                    var usuario = ObtemUsuarioPorIdUser((int)logUsuarioModel.CodUser);
                    logUsuarioModel.Email = usuario.Email;
                }
                else
                {
                    var usuario = ObtemUsuarioPorEmail(logUsuarioModel.Email);
                    if (usuario != null)
                        logUsuarioModel.CodUser = usuario.CodUser;
                    else
                    {
                        return 0;
                    }
                }

                logUsuarioModel.DataLog = DateTime.Now;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"INSERT INTO tblLog (CodUser,Email,DataLog,Informacao,URL,IP) VALUES
                                (@CodUser,@Email,@DataLog,@Informacao,@URL,@IP); SELECT CAST(SCOPE_IDENTITY() as int)";

                    var result = conexaoBD.QuerySingle<int>(q, new
                    {
                        @CodUser = logUsuarioModel.CodUser,
                        @Email = logUsuarioModel.Email,
                        @DataLog = logUsuarioModel.DataLog,
                        @Informacao = logUsuarioModel.Informacao,
                        @URL = logUsuarioModel.URL,
                        @IP = logUsuarioModel.IP,
                    });

                    return result;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return 0;
            }
        }


        public UsuarioModel ObtemUsuarioPorEmail(string email)
        {
            try
            {
                string sqlComand = @"SELECT * FROM tblUser  where  Email = @email AND FlagAtivo = 1";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var param = new DynamicParameters();
                    param.Add("@email", email);

                    return conexaoBD.QueryFirstOrDefault<UsuarioModel>(sqlComand, param, null, 300, CommandType.Text);
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }


        public UsuarioModel ObtemUsuarioPorIdUser(int CodUser)
        {
            try
            {
                string sqlComand = @"SELECT * FROM tblUser where  CodUser = @CodUser AND FlagAtivo = 1";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var param = new DynamicParameters();
                    param.Add("@CodUser", CodUser);

                    return conexaoBD.QueryFirstOrDefault<UsuarioModel>(sqlComand, param, null, 300, CommandType.Text);
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }


        public List<LogUsuarioModel> ListarLogs()
        {
            var retorno = new List<LogUsuarioModel>();

            try
            {
                string query = @" select * from tblLog order by IdLog desc ";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    retorno = conexaoBD.Query<LogUsuarioModel>(query).ToList();
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }

            return retorno;
        }
    }
}
