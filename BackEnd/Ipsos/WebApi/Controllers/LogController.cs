using DataAccess.LogUsuario;
using DataAccess.Usuario;
using Entities.LogUsuario;
using Entities.Parametros;
using Entities.Usuario;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
    [RoutePrefix("api/Log")]
    [AllowAnonymous]
    public class LogController : ApiController
    {
        private LogDataAccess _contextLog = new LogDataAccess(Usuario.Email);

        [HttpPost]
        [Route("GravaLog")]
        public HttpResponseMessage GravaLog(LogUsuarioModel logUsuarioModel)
        {
            var response = new Response();
            try
            {
                var informacao = string.Concat("Log Info - ", DateTime.Now.ToString());
                logUsuarioModel.Informacao = informacao;
                _contextLog.InsertLog(logUsuarioModel);

                return Request.CreateResponse(HttpStatusCode.OK, new UsuarioModel());

            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "[" + logUsuarioModel.Email + "]" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }





    }
}
