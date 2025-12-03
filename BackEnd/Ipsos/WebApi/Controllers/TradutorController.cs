using DataAccess.LogUsuario;
using DataAccess.Traducao;
using DataAccess.Usuario;
using Entities.LogUsuario;
using Entities.TraducaoIdioma;
using Entities.Usuario;
using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;




namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Tradutor")]

    [AllowAnonymous]
    public class TradutorController : ApiController
    {

        private TraducaoDataAccess _context = new TraducaoDataAccess(Usuario.Email);

        [HttpPost]
        [Route("ObterTraducao")]
        public HttpResponseMessage ObterTraducao(LangViewModel lang)
        {
            var response = new Response();
            try
            {
               var list =  _context.ObterTraducao(lang);

                return Request.CreateResponse(HttpStatusCode.OK, list);

            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod().Name, "Sistema" + ex.Message);
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";
                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }
    }
}
