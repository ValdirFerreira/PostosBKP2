using DataAccess.DashBoardTwo;
using DataAccess.Traducao;
using Entities.DTOs;
using Entities.Parametros;
using Helpers.Logtxt;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

using WebApi.Models;



namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Entrevistador")]

    [Authorize]
    public class EntrevistadorController : ApiController
    {

        private DataAccessEntrevistador _context = new DataAccessEntrevistador(Usuario.Email);


        [HttpPost]
        [Route("EntrevistadorConsultar")]
        public HttpResponseMessage EntrevistadorConsultar([FromBody] int codIdioma)
        {

            var response = new Response();
            try
            {
                var list = _context.EntrevistadorConsultar(codIdioma);

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

        [HttpPost]
        [Route("EntrevistadorConsultarPeloID")]
        public HttpResponseMessage EntrevistadorConsultarPeloID([FromBody] ProprietarioConsultarRequest request)
        {

            var response = new Response();
            try
            {
                var list = _context.EntrevistadorConsultarPeloID(request.Cod, request.CodIdioma);

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


        [HttpPost]
        [Route("EntrevistadorCadastrar")]
        public HttpResponseMessage EntrevistadorCadastrar([FromBody] ProprietarioCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.EntrevistadorCadastrar(model);

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    "Sistema" + ex.Message
                );

                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }



    }
}
