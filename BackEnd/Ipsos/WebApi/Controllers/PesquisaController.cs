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
    [RoutePrefix("api/Pesquisa")]

    [AllowAnonymous]
    public class PesquisaController : ApiController
    {

        private DataAccessPesquisa _context = new DataAccessPesquisa(Usuario.Email);


        [HttpPost]
        [Route("ConsultarPesquisaQuestoes")]
        public HttpResponseMessage ConsultarPesquisaQuestoes([FromBody] PesquisaRequest model)
        {
            var response = new Response();

            try
            {
                var result = _context.ConsultarPesquisaQuestoes(model);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    "Sistema" + ex.Message
                );

                response.StatusCode = 500;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }


        [HttpPost]
        [Route("VerificarPesquisaResposta")]
        public HttpResponseMessage VerificarPesquisaResposta(
    [FromBody] PesquisaVerificaRespostaRequest model
)
        {
            var response = new Response();

            try
            {
                var result = _context.VerificarPesquisaResposta(model.ParamDocumento);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    "Sistema " + ex.Message
                );

                response.StatusCode = 500;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }



        [HttpPost]
        [Route("CadastrarPesquisaResposta")]
        public HttpResponseMessage CadastrarPesquisaResposta(
    [FromBody] PesquisaRespostaCadastrarRequest model
)
        {
            var response = new Response();

            try
            {
                var result = _context.CadastrarPesquisaResposta(model);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                LogText.Instance.Error(
                    this.GetType().Name,
                    System.Reflection.MethodBase.GetCurrentMethod().Name,
                    "Sistema " + ex.Message
                );

                response.StatusCode = 500;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }


    }
}
