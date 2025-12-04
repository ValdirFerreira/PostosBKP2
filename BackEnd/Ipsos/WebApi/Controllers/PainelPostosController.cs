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
    [RoutePrefix("api/PainelPostos")]

    [Authorize]
    public class PainelPostosController : ApiController
    {

        private DataAccessPainelPostos _context = new DataAccessPainelPostos(Usuario.Email);


        [HttpPost]
        [Route("ProprietarioConsultar")]
        public HttpResponseMessage ProprietarioConsultar([FromBody] int codIdioma)
        {

            var response = new Response();
            try
            {
                var list = _context.ProprietarioConsultar(codIdioma);

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
        [Route("ProprietarioConsultarPeloID")]
        public HttpResponseMessage ProprietarioConsultarPeloID([FromBody] ProprietarioConsultarRequest request)
        {

            var response = new Response();
            try
            {
                var list = _context.ProprietarioConsultarPeloID(request.Cod, request.CodIdioma);

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
        [Route("ProprietarioCadastrar")]
        public HttpResponseMessage ProprietarioCadastrar([FromBody] ProprietarioCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var novoId = _context.ProprietarioCadastrar(model);

                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    CodProprietario = novoId
                });
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
