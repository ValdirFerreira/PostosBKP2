using Business.TrataDados;
using Dapper;
using DataAccess.Config;
using Entities.Parametros;
using Entities.PopupMsn;
using Entities.Usuario;
using Helpers.Logtxt;
using Newtonsoft.Json;
using SisConn;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;



namespace DataAccess.Usuario
{
    public class UsuarioDataAccess
    {

        private readonly string usuarioEmail = string.Empty;

        public UsuarioDataAccess(string usuario)
        {
            usuarioEmail = usuario;
        }


        public PopupMsn CarregarPopUpMsn(FiltroPadrao filtro)
        {
            var retorno = new PopupMsn();

            try
            {
                var parametros = new DynamicParameters();
                parametros.Add("@CodUserParam", filtro.CodUser);
                parametros.Add("@CodIdiomaParam", filtro.CodIdioma);

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var list = conexaoBD.Query<PopupMsn>("pr_Lista_PopUp", parametros, null, false, 300, System.Data.CommandType.StoredProcedure).ToList();

                    if (list.Count > 0)
                        retorno = list.FirstOrDefault();
                }

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
            }

            return retorno;
        }

        public class IpsosSecureResult
        {
            public int UsuarioId { get; set; }
            public int Status { get; set; }
            public string Descricao { get; set; }

        }

        private IpsosSecureResult IpsosSecureLogin(string email, string password, string ip, int idiomaId = 0)
        {
            try
            {
                var userRequest = new { Login = email, Password = password, IP = ip, IdiomaId = idiomaId };
                var userRequestJson = JsonConvert.SerializeObject(userRequest);
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Add("Referer", HttpContext.Current.Request.Url.AbsoluteUri);

                //https://brasil.ipsoslatam.com/IpsosSecureAccess-HML/webapi/api/services/user/validar
                var urlwebApi = string.Concat(ConfigurationManager.AppSettings["IpsosSecureAccessEndPointApi"].ToString(), "/api/services/user/validar");

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(ConfigurationManager.AppSettings["IpsosSecureAccessClientKey"].ToString());
                HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, urlwebApi);
                httpRequest.Content = new StringContent(userRequestJson, Encoding.UTF8, "application/json");
                using (HttpResponseMessage response2 = client.SendAsync(httpRequest).GetAwaiter().GetResult())
                {
                    using (HttpContent content = response2.Content)
                    {
                        var stringResult = content.ReadAsStringAsync();
                        var jsonResult = stringResult.GetAwaiter().GetResult();
                        IpsosSecureResult ipsosSecureResult = JsonConvert.DeserializeObject<IpsosSecureResult>(jsonResult);
                        return ipsosSecureResult;
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UsuarioModel Login(LoginUsuario login)
        {
            try
            {





                // IpsosSecureResult IpsosSecureResult = IpsosSecureLogin(login.Email, login.Password, login.IP, login.IdiomaId);

                IpsosSecureResult IpsosSecureResult = new IpsosSecureResult {  Status = 200 , UsuarioId = 1};

                if (IpsosSecureResult.Status == 200)
                {
                    string sqlComand = @"SELECT *  FROM tblUser with(nolock) where  CodUser = @CodUser";

                    using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                    {
                        var param = new DynamicParameters();
                        param.Add("@CodUser", IpsosSecureResult.UsuarioId);

                        return conexaoBD.QueryFirstOrDefault<UsuarioModel>(sqlComand, param, null, 300, CommandType.Text);
                    }
                }
                else
                {
                    LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + JsonConvert.SerializeObject(IpsosSecureResult));


                    throw new Exception(JsonConvert.SerializeObject(IpsosSecureResult));
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public UsuarioModel LoginIntegrado(LoginUsuario login)
        {
            try
            {

                login.IdiomaId = 1;
                login.IP = "teste";

                string sqlComand = @"SELECT *  FROM tblUser with(nolock) where  FlagAtivo = 1 and  CodUser = @CodUser";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var param = new DynamicParameters();
                    param.Add("@CodUser", login.CodUser);

                    return conexaoBD.QueryFirstOrDefault<UsuarioModel>(sqlComand, param, null, 300, CommandType.Text);
                }

            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }


        public UsuarioModel GetUsers(string email)
        {
            try
            {
                string sqlComand = @"SELECT *  FROM tblUser with(nolock) where Email =" + "'" + email + "'";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {

                    var listusers = conexaoBD.Query<UsuarioModel>(sqlComand, null, null, false, 300, CommandType.Text).ToList();


                    if (listusers.Any())
                    {
                        return listusers.FirstOrDefault();
                    }
                    return null;
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public IpsosSecureResult InsertUser(UsuarioModel usuarioModel)
        {
            try
            {
                usuarioModel.CreateDate = DateTime.Now;
                usuarioModel.UpdateDate = DateTime.Now;
                usuarioModel.FlagAtivo = true;
                usuarioModel.Token = "";
                usuarioModel.Password = "Mudar@2025";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"insert into tblUser
                                                (Name
                                                ,Email
                                                ,Password
                                                ,CreateDate 
                                                ,UpdateDate
                                                ,FlagAtivo
                                                ,CodUserPerfil
                                               )
                                                values 
                                                        (@Name
                                                        ,@Email
                                                        ,@Password
                                                        ,@CreateDate 
                                                        ,@UpdateDate
                                                        ,@FlagAtivo
                                                        ,@CodUserPerfil
                                                        )";

                    var result = conexaoBD.Execute(q, new
                    {
                        @Name = usuarioModel.Name,
                        @Email = usuarioModel.Email.ToLower(),
                        @Password = usuarioModel.Password,
                        @CreateDate = usuarioModel.CreateDate,
                        @UpdateDate = usuarioModel.UpdateDate,
                        @FlagAtivo = usuarioModel.FlagAtivo,
                        @CodUserPerfil = 2 // COMUN

                    });


                    var userNew = GetUsers(usuarioModel.Email.ToLower());
                    //if (userNew != null)
                    //{
                    //    InsertUserBancos(usuarioModel.Portais, userNew.CodUser);
                    //}

                    CriptografaSenhaNovoUsuario(userNew.CodUser);

                    IpsosSecureResult IpsosSecureResult = IpsosSecureLogin(usuarioModel.Email, usuarioModel.Password, usuarioModel.IP, 1);

                    return IpsosSecureResult;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return null;
            }
        }

        public int UpdatePopupUser(UsuarioModel usuarioModel)
        {
            try
            {

                usuarioModel.UpdateDate = DateTime.Now;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"update tblUser set                                         
                                        FlagPopUp = @FlagPopUp, 
                                        UpdateDate = @UpdateDate
                                        where CodUser = @CodUser";

                    var result = conexaoBD.Execute(q, new
                    {
                        @FlagPopUp = usuarioModel.FlagPopUp,
                        @UpdateDate = usuarioModel.UpdateDate,
                        @CodUser = usuarioModel.CodUser,
                    });


                    return 1;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return 0;
            }
        }

        public int UpdateUser(UsuarioModel usuarioModel)
        {
            try
            {

                usuarioModel.UpdateDate = DateTime.Now;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"update tblUser set                                         
                                        Name         = @Name,
                                        Email        = @Email,
                                   
                                        UpdateDate   = @UpdateDate,
                                        FlagAtivo       = @FlagAtivo,
                                        CodUserPerfil   = @CodUserPerfil
                                        where CodUser = @CodUser";

                    var result = conexaoBD.Execute(q, new
                    {
                        @Name = usuarioModel.Name,
                        @Email = usuarioModel.Email.ToLower(),
                        //@Password = usuarioModel.Password,
                        @UpdateDate = usuarioModel.UpdateDate,
                        @FlagAtivo = usuarioModel.FlagAtivo,
                        @CodUserPerfil = usuarioModel.CodUserPerfil,
                        @CodUser = usuarioModel.CodUser

                    });

                    InsertUserBancos(usuarioModel.Portais, usuarioModel.CodUser);


                    return 1;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return 0;
            }
        }

        public bool CriptografaSenhaNovoUsuario(int CodUser)
        {
            try
            {
                string sqlComand = @"update tblUser set Password = cast(HASHBYTES('SHA2_512', Password) as varchar(100)) where CodUser =" + CodUser;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var exec = conexaoBD.Execute(sqlComand);

                    return true;

                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);

                return false;
            }
        }

        public List<UsuarioModel> ListUsers(UsuarioModel usuarioModel)
        {
            try
            {
                string sqlComand = @"SELECT *  FROM tblUser with(nolock) ";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {

                    var listusers = conexaoBD.Query<UsuarioModel>(sqlComand, null, null, false, 300, CommandType.Text).ToList();

                    //if (listusers.Any())
                    //{
                    //    CarregaAcessoPortaisUsers(listusers);
                    //}

                    return listusers;
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Somente Altera o Status
        /// </summary>
        /// <param name="commentModele"></param>
        /// <returns></returns>
        public int UserForDelete(UsuarioModel usuarioModel)
        {
            try
            {
                usuarioModel.FlagAtivo = false;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"update tblUser set                                         
                                        FlagAtivo       = @FlagAtivo
                                        where CodUser = @CodUser";

                    var result = conexaoBD.Execute(q, new
                    {
                        @Active = usuarioModel.FlagAtivo,
                        @CodUser = usuarioModel.CodUser,
                    });


                    return 1;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);

                return 0;
            }

            return 1;
        }



        public EsqueceuSenhaModel SolicitarNovaSenha(string email)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var ChecaEmail = new EsqueceuSenhaModel();

                    ChecaEmail = conexaoBD.Query<EsqueceuSenhaModel>("SELECT Email, Name FROM BHTQuintoAndar.dbo.tblUser WITH(NOLOCK) where Email = @Email", new { Email = email }, null).FirstOrDefault();
                    if (ChecaEmail != null)
                    {
                        string tokenEmailRecuperacao = Guid.NewGuid().ToString();
                        conexaoBD.QueryAsync<EsqueceuSenhaModel>("INSERT INTO BHTQuintoAndar.dbo.tblRecuperacaoSenhaUserToken WITH(ROWLOCK) VALUES (@Token,@Email,@DataCriacaoToken,NULL)", new { Token = tokenEmailRecuperacao, Email = email, DataCriacaoToken = DateTime.Now }, null, 300).Result.ToList();

                        // Enviando Email
                        string url = ConfigurationManager.AppSettings["urlRecuperacaoSenha"].ToString();
                        url = $"{url}/#/home/recuperar-senha?token={tokenEmailRecuperacao}";
                        string msgHtmlQueSeraEnviadaPorEmail;

                        msgHtmlQueSeraEnviadaPorEmail = LayoutHTMLRecuperarSenhaEmail(url, ChecaEmail.Name, "QuintoAndar");
                        EnviarEmailRecuperacaoDeSenha(ChecaEmail.Email, msgHtmlQueSeraEnviadaPorEmail); // Comentar em dev
                        return ChecaEmail;
                    }
                    else
                    {
                        return null;
                    }
                }

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return null;
            }
        }

        private string LayoutHTMLRecuperarSenhaEmail(string url, string userName, string sistema)
        {
            string html = string.Empty;
            html = $@"
                  <body style="" - ms - text - size - adjust: 100 %; -webkit - text - size - adjust: 100 %; width: 100 %; height: 100 %; margin: 0; padding: 0; background - color: #ffffff;""> 
                  <center> 
                  <table align=""center"" border=""0"" cellpadding=""0"" cellspacing=""0"" height=""100%"" width=""100%"" id=""bodyTable"" style=""border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; height: 100%; margin: 0; padding: 0; background-color: #ffffff;""> 
                  <tbody>
                  <tr>
                  <td align=""center"" valign=""top"" id=""bodyCell"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; height: 100%; margin: 0; padding: 0; border-top: 0;""> 
                  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> 
                  <tbody>
                  <tr>
                  <td align=""center"" valign=""top"" class=""section1Column"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: transparent; border-top: 0; border-bottom: 0px; padding-top: 0px; padding-bottom: 0px;""> 
                  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" class=""sectionContainer"" style=""border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width:100%; max-width: 600px !important; background-color: transparent;""> 
                  <tbody>
                  <tr> 
                  <td valign=""top"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"">
                  <table class=""columnContainer"" align=""left"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""width:600px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"">
                  <tbody>
                  <tr> <td class=""columnContainerCell"" valign=""top"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-size: 16px; line-height: 110%; font-family: Helvetica, Arial, sans-serif; color: #666666;""> 
                  <table border=""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" class=""columnContainerSize"" style=""border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width:100%; max-width: 600px !important; background-color: transparent;"">
                  <tbody><tr>  </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table>  </td> </tr>
                  <tr>
                  <td align = ""center"" valign = ""top"" class=""section1Column"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: transparent; border-top: 0; border-bottom: 0px; padding-top: 0px; padding-bottom: 0px;""> 
                  <table border = ""0"" cellpadding=""0"" cellspacing=""0"" width=""100%"" class=""sectionContainer"" style=""border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width:100%; max-width: 600px !important; background-color: #FFFFFF;""> 
                  <tbody>
                  <tr> 
                  <td valign = ""top"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;""> <table class=""columnContainer"" align=""left"" border=""0"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""width:600px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;""> <tbody><tr> <td class=""columnContainerCell"" valign=""top"" style=""mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-size: 16px; line-height: 110%; font-family: Helvetica, Arial, sans-serif; color: #666666;""> <table width = ""100%"" border=""0"" cellspacing=""0"" cellpadding=""0"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse !important;""> <tbody><tr> <td bgcolor = ""transparent"" align=""center"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top: 9px; padding-bottom: 9px; padding-left: 18px; padding-right: 18px;""> <a href = ""#"" title="""" target=""_blank"" style=""-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%"">  </a> </td> </tr> </tbody></table>
                  <table width = ""100%"" border=""0"" cellspacing=""0"" cellpadding=""0"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse !important;""> <tbody><tr> <td bgcolor = ""transparent"" align=""center"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; padding-top: 9px; padding-bottom: 9px; padding-left: 18px; padding-right: 18px;"">  </td> </tr> </tbody></table>
                  <table width = ""100%"" border=""0"" cellspacing=""0"" cellpadding=""0"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse !important;""> <tbody><tr> <td bgcolor = ""transparent"" align=""left"" style=""-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; font-size: 16px; line-height: 150%; font-family: Helvetica, Arial, sans-serif; color: #666666; padding: 9px 18px; word-break: break-word !important;"" class=""padding""> <h1 style = ""text-align: center; line-height: 125%;""><span style=""color: #292929;font-size: 24px;"">Recuperação de senha</span></h1> <p style = ""text-align: center; line-height: 150%;"" > Olá <strong> {userName}</strong>, você solicitou a recuperação da senha do <strong>{sistema}</strong> <br>
                 Clique abaixo e você será redirecionado para alterar a senha.

                  </p> <center><table border = ""0"" cellpadding= ""14"" cellspacing= ""0"" style= ""background: gray;border-radius:6px;color:#ffffff;cursor:pointer;display:inline-block;font-size:20px;font-weight:bold;line-height:24px;margin:0px auto;text-align:center;"" class=""button main""> <tbody> <tr> <td align = ""center"" style=""vertical-align:middle"" class=""emailButtonContent""><font color = ""#444444"" ><a target=""_blank"" style=""text-decoration:none; padding: 0 8px;"" href=""{url}""><font color = ""white"" > Mudar senha</font></a></font></td> </tr> </tbody> </table> </center>
                 </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table>  </td> </tr> 
                 </tbody></table> </td> </tr> </tbody></table> </center>  
                 </body>";

            return html;
        }

        private int EnviarEmailRecuperacaoDeSenha(string destinatario, string mensagemHtml)
        {

            try
            {
                clsAcessoBanco obj_Banco = new clsAcessoBanco();
                var parametros = new DynamicParameters();
                parametros.Add("@BancoOrigem", "BHTQuintoAndar");
                parametros.Add("@CodEmailBancoOrigem", 0);
                parametros.Add("@CodCliente", 0);
                parametros.Add("@Destinatario", destinatario);
                parametros.Add("@Remetente", "noreply@ipsossurvey.com.br");
                parametros.Add("@NRemetente", "noreply@ipsossurvey.com.br");
                parametros.Add("@Assunto", "Recuperación de la Contraseña - Banistmo");
                parametros.Add("@CorpoHTML", mensagemHtml);
                parametros.Add("@CorporTexto", "");
                parametros.Add("@CodLote", 0);
                parametros.Add("@Cco", "");
                parametros.Add("codEmailEnvioOUT", DbType.Int64, direction: ParameterDirection.Output);
                string strSql = @"[BRSAP2SQL02\BRSAP2SQL02].IpsosMail.dbo.sp_InsereNovoQuickEmail";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    conexaoBD.Query<int>(strSql, parametros, null, true, null, commandType: CommandType.StoredProcedure);
                    int newID = parametros.Get<int>("codEmailEnvioOUT");
                    return newID;
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw ex;
            }
        }


        public bool VerificarSeTokenJaFoiUtilizadoAoAlterarSenha(string token)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var ChecaToken = new ChecaTokenModel();

                    ChecaToken = conexaoBD.Query<ChecaTokenModel>("SELECT DataTokenUtilizado, Token FROM BHTQuintoAndar.dbo.tblRecuperacaoSenhaUserToken WITH(NOLOCK) where Token = @Token", new { Token = token }, null).FirstOrDefault();

                    if (ChecaToken != null)
                    {
                        if (String.IsNullOrWhiteSpace(ChecaToken.DataTokenUtilizado.ToString()))
                        {
                            return true;
                        }

                        return false;
                    }
                    else
                    {
                        return false;
                    }

                }

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return false;
            }
        }

        public bool AtualizarSenha(AtualizarSenhaModel objAtualizarSenha)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    if (VerificarSeTokenJaFoiUtilizadoAoAlterarSenha(objAtualizarSenha.Token))
                    {

                        CapturaEmailCadastradoViaToken(objAtualizarSenha);

                        if (string.IsNullOrWhiteSpace(objAtualizarSenha.Email))
                        {
                            return false;
                        }

                        conexaoBD.Query("UPDATE tblUser WITH(ROWLOCK) SET Password = @Password WHERE Email = @Email", new { Password = objAtualizarSenha.Senha, Email = objAtualizarSenha.Email }, null);
                        conexaoBD.Query("UPDATE BHTQuintoAndar.dbo.tblRecuperacaoSenhaUserToken WITH(ROWLOCK) SET DataTokenUtilizado = @DataTokenUtilizado WHERE Token = @Token", new { DataTokenUtilizado = DateTime.Now, Token = objAtualizarSenha.Token }, null);
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return false;
            }
        }

        public void CapturaEmailCadastradoViaToken(AtualizarSenhaModel objAtualizarSenha)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var Email = new AtualizarSenhaModel();

                    Email = conexaoBD.Query<AtualizarSenhaModel>("SELECT DataTokenUtilizado, Token, Email FROM BHTQuintoAndar.dbo.tblRecuperacaoSenhaUserToken WITH(NOLOCK) where Token = @Token", new { Token = objAtualizarSenha.Token }, null).FirstOrDefault();

                    if (Email != null)
                    {
                        objAtualizarSenha.Email = Email.Email;
                    }
                }

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw ex;
            }
        }



        #region TABELAS RELACIONADAS AO GRUPO NESTLE

        public List<UserBanco> ListlUsersBanco()
        {
            try
            {
                string sqlComand = @"SELECT *  FROM tblUserBanco with(nolock) ";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    return conexaoBD.Query<UserBanco>(sqlComand, null, null, false, 300, CommandType.Text).ToList();
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public List<BancoModel> ListBancos(UsuarioModel usuarioModel)
        {
            try
            {
                string sqlComand = @"SELECT *  FROM tblBanco with(nolock) ";

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    return conexaoBD.Query<BancoModel>(sqlComand, null, null, false, 300, CommandType.Text).ToList();
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public int InsertUserBancos(string portais, int codUser)
        {

            // refaz os acessos
            var deleteOK = UserBancosDelete(codUser);

            if (string.IsNullOrWhiteSpace(portais))
                return 1;

            try
            {

                var listUserBanco = new List<UserBanco>();

                var listNewPortais = portais.Split(',');

                foreach (var item in listNewPortais)
                {
                    listUserBanco.Add(new UserBanco { CodBanco = Convert.ToInt32(item), CodUser = codUser });
                }


                if (deleteOK)
                {
                    foreach (var userBanco in listUserBanco)
                    {
                        using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                        {
                            var q = @"insert into tblUserBanco
                                                (CodUser
                                                ,CodBanco
                                               )
                                                values 
                                                        (@CodUser
                                                        ,@CodBanco
                                                        )";

                            var result = conexaoBD.Execute(q, new
                            {
                                @CodUser = userBanco.CodUser,
                                @CodBanco = userBanco.CodBanco

                            });
                        }
                    }
                    return 1;
                }
                else
                {
                    return 0;
                }

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                return 0;
            }
        }

        private bool UserBancosDelete(int CodUser)
        {
            try
            {
                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    var q = @"DELETE FROM tblUserBanco WHERE CodUser = " + CodUser;

                    var result = conexaoBD.Execute(q);


                }
            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);

                return false;
            }

            return true;
        }


        public void CarregaAcessoPortaisUsers(List<UsuarioModel> listUsers)
        {
            var listBancoUsers = ListlUsersBanco();

            if (listBancoUsers.Any())
            {
                foreach (var user in listUsers)
                {
                    var portaisUser = listBancoUsers.Where(x => x.CodUser == user.CodUser).ToList();
                    if (portaisUser.Any())
                    {
                        user.Portais = string.Join(",", portaisUser.Select(a => a.CodBanco));
                    }

                }
            }
        }



        public List<BancoModel> ListPortalDisponivel(UsuarioModel usuarioModel)
        {
            try
            {
                string sqlComand = @" SELECT B .*
                                              FROM tblUserBanco UB with(nolock)
                                              join tblBanco B with(nolock) on UB.CodBanco = B.CodBanco
                                              where  B.FlagAtivo = 1 and CodUser =  " + usuarioModel.CodUser;

                using (SqlConnection conexaoBD = new SqlConnection(Conexao.strConexao))
                {
                    return conexaoBD.Query<BancoModel>(sqlComand, null, null, false, 300, CommandType.Text).ToList();
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + usuarioEmail + "]" + ex.Message);
                throw new Exception(ex.Message);
            }
        }


        #endregion

    }
}
