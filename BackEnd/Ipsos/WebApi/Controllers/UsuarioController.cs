using DataAccess.LogUsuario;
using DataAccess.Usuario;
using Entities.LogUsuario;
using Entities.Parametros;
using Entities.Usuario;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Usuario")]
    [AllowAnonymous]
    public class UsuarioController : ApiController
    {
        private UsuarioDataAccess _context = new UsuarioDataAccess(Usuario.Email);
        private LogDataAccess _contextLog = new LogDataAccess(Usuario.Email);

        [HttpPost]
        [Route("Login")]
        public HttpResponseMessage Login(LoginUsuario login)
        {
            var response = new Response();
            try
            {
                var usuario = _context.Login(login);

                if (usuario != null && usuario.CodUser > 0)
                {
                    Usuario.Email = usuario.Email;
                    Usuario.Password = usuario.Password;
                    Usuario.CodUser = usuario.CodUser;

                    var informacao = string.Concat("Usuario Logado com sucesso - ", login.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = usuario.Email, CodUser = usuario.CodUser, Informacao = informacao, URL = "Login" });

                    return Request.CreateResponse(HttpStatusCode.OK, usuario);
                }
                else
                {
                    var informacao = string.Concat("Tentativa de Login Falhou - ", login.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = login.Email, Informacao = informacao, URL = "Login" });

                    return Request.CreateResponse(HttpStatusCode.OK, new UsuarioModel());
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + login.Email + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                var informacao = string.Concat("Tentativa de Login Falhou - ", login.Email, " ", DateTime.Now.ToString(), " - ", ex.Message);
                _contextLog.InsertLog(new LogUsuarioModel { Email = login.Email, Informacao = informacao, URL = "Login" });

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("LoginIntegrado")]
        public HttpResponseMessage LoginIntegrado(LoginUsuario login)
        {
            var response = new Response();
            try
            {
                var usuario = _context.LoginIntegrado(login);

                if (usuario != null && usuario.CodUser > 0)
                {
                    Usuario.Email = usuario.Email;
                    Usuario.Password = usuario.Password;
                    Usuario.CodUser = usuario.CodUser;

                    var informacao = string.Concat("Usuario Logado com sucesso - ", login.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = usuario.Email, CodUser = usuario.CodUser, Informacao = informacao, URL = "Login" });

                    return Request.CreateResponse(HttpStatusCode.OK, usuario);
                }
                else
                {
                    var informacao = string.Concat("Tentativa de Login Falhou - ", login.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = login.Email, Informacao = informacao, URL = "Login" });

                    return Request.CreateResponse(HttpStatusCode.OK, new UsuarioModel());
                }
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + login.Email + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("EsqueceuSenha")]
        public HttpResponseMessage EsqueceuSenha(EsqueceuSenhaModel esqueceuSenhaModel)
        {
            var response = new Response();

            try
            {
                var users = _context.SolicitarNovaSenha(esqueceuSenhaModel.Email);

                if (users != null)
                {
                    var informacao = string.Concat("Solicitação de nova senha - ", esqueceuSenhaModel.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = esqueceuSenhaModel.Email, Informacao = informacao, URL = "EsqueceuSenha" });
                    return Request.CreateResponse(HttpStatusCode.OK, users);
                }
                else
                {
                    var informacao = string.Concat("Solicitação de nova senha : Email não encontrado - ", esqueceuSenhaModel.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = esqueceuSenhaModel.Email, Informacao = informacao, URL = "EsqueceuSenha" });
                    response = new Response(404, "Email não encontrado!");
                }

                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + esqueceuSenhaModel.Email + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("AtualizarSenha")]
        public HttpResponseMessage AtualizarSenha(AtualizarSenhaModel atualizarSenhaModel)
        {
            var response = new Response();

            try
            {

                bool result = _context.AtualizarSenha(atualizarSenhaModel);

                if (result)
                {
                    var informacao = string.Concat("Alteração senha - ", atualizarSenhaModel.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = atualizarSenhaModel.Email, Informacao = informacao, URL = "AtualizarSenha" });
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                else
                {
                    var informacao = string.Concat("Alteração senha : Expired token - ", atualizarSenhaModel.Email, " ", DateTime.Now.ToString());
                    _contextLog.InsertLog(new LogUsuarioModel { Email = atualizarSenhaModel.Email, Informacao = informacao, URL = "AtualizarSenha" });

                    response = new Response(404, "Expired token.");
                }

                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + atualizarSenhaModel.Email + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("VerificarTokenValido")]
        public HttpResponseMessage VerificarTokenValido(ChecaTokenModel checaTokenModel)
        {
            var response = new Response();

            try
            {

                bool result = _context.VerificarSeTokenJaFoiUtilizadoAoAlterarSenha(checaTokenModel.Token);

                if (result)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                else
                {
                    response = new Response(404, "Expired token.");
                }

                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + checaTokenModel.Token + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        //APIS DE GERENCIAMENT ODE USUÁRIOS

        [HttpPost]
        [Route("InsertUser")]
        [Authorize]
        public HttpResponseMessage InsertUser(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {
                var lista = _context.InsertUser(usuarioModel);
                return Request.CreateResponse(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }

        }

        [HttpPost]
        [Route("UpdateUser")]
        [Authorize]
        public HttpResponseMessage UpdateUser(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {

                var lista = _context.UpdateUser(usuarioModel);

                return Request.CreateResponse(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }

        }

        [HttpPost]
        [Route("UserForDelete")]
        [Authorize]
        public HttpResponseMessage UserForDelete(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {

                var lista = _context.UserForDelete(usuarioModel);

                return Request.CreateResponse(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }

        }

        [HttpPost]
        [Route("ListUsers")]
        [Authorize]
        public HttpResponseMessage ListUsers(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {
                var listUsers = _context.ListUsers(usuarioModel);
                return Request.CreateResponse(HttpStatusCode.OK, listUsers);
            }
            catch (SqlException ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("CarregarPopUpMsn")]
        public HttpResponseMessage CarregarPopUpMsn(FiltroPadrao filtro)
        {
            var response = new Response();
            try
            {
                var popUpMsn = _context.CarregarPopUpMsn(filtro);
                return Request.CreateResponse(HttpStatusCode.OK, popUpMsn);
            }
            catch (SqlException ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("UpdatePopupUser")]
        public HttpResponseMessage UpdatePopupUser(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {
                var popUpMsn = _context.UpdatePopupUser(usuarioModel);
                return Request.CreateResponse(HttpStatusCode.OK, popUpMsn);
            }
            catch (SqlException ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }



        #region BANCO DOS USUÁRIOS


        [HttpPost]
        [Route("ListBancos")]
        [Authorize]
        public HttpResponseMessage ListBancos(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {
                var listUsers = _context.ListBancos(usuarioModel);
                return Request.CreateResponse(HttpStatusCode.OK, listUsers);
            }
            catch (SqlException ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }



        [HttpPost]
        [Route("ListPortalDisponivel")]
        //[Authorize]
        [AllowAnonymous]
        public HttpResponseMessage ListPortalDisponivel(UsuarioModel usuarioModel)
        {
            var response = new Response();
            try
            {
                var listUsers = _context.ListPortalDisponivel(usuarioModel);
                return Request.CreateResponse(HttpStatusCode.OK, listUsers);
            }
            catch (SqlException ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }


        #endregion 



    }
}
