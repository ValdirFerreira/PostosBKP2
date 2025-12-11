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
                var result = _context.ProprietarioCadastrar(model);

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

        [HttpPost]
        [Route("ProprietarioAtualizarStatus")]
        public HttpResponseMessage ProprietarioAtualizarStatus([FromBody] ProprietarioCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                var result = _context.AtualizarStatusProprietario(model.Cod, model.Status);

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

        [HttpPost]
        [Route("ProprietarioFileCadastrar")]
        public HttpResponseMessage ProprietarioFileCadastrar([FromBody] FilePostos model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.ProprietarioFileCadastrar(model);

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


        [HttpPost]
        [Route("RecuperaArquivo")]
        public HttpResponseMessage RecuperaArquivo([FromBody] FilePostos model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.RecuperaArquivo(model);

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


        ////////////////////////////////////////////////////////////
        ///

        [HttpPost]
        [Route("FuncionariosConsultar")]
        public HttpResponseMessage FuncionariosConsultar([FromBody] Postos model)
        {

            var response = new Response();
            try
            {
                var list = _context.FuncionariosConsultar(model.CodIdioma);

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
        [Route("CadastrarFuncionario")]
        public HttpResponseMessage CadastrarFuncionario([FromBody] PostoFuncionarioCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.CadastrarFuncionario(model);

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


        [HttpPost]
        [Route("AtualizarFuncionario")]
        public HttpResponseMessage AtualizarFuncionario([FromBody] PostoFuncionarioCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.AtualizarFuncionario(model);

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



        [HttpGet]
        [Route("ConsultarFuncionarios")]
        public HttpResponseMessage ConsultarFuncionarios(int codPosto, int codIdioma)
        {
            var response = new Response();

            try
            {
                // chama o método no service/context
                var result = _context.ConsultarFuncionarios(codPosto, codIdioma);

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


        [HttpGet]
        [Route("ConsultarFuncionarioPeloID")]
        public HttpResponseMessage ConsultarFuncionarioPeloID(int cod, int codIdioma)
        {
            var response = new Response();

            try
            {
                var result = _context.ConsultarFuncionarioPeloID(cod, codIdioma);

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

        [HttpDelete]
        [Route("ExcluirFuncionario")]
        public HttpResponseMessage ExcluirFuncionario(int cod)
        {
            var response = new Response();

            try
            {
                var result = _context.ExcluirFuncionario(cod);

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


        ////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpPost]
        [Route("CadastrarAssociacao")]
        public HttpResponseMessage CadastrarAssociacao([FromBody] PostoAssociacaoCadastrarRequest model)
        {
            var response = new Response();

            try
            {
                var result = _context.CadastrarAssociacao(model);

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

        [HttpPost]
        [Route("AtualizarAssociacao")]
        public HttpResponseMessage AtualizarAssociacao([FromBody] PostoAssociacaoAtualizarRequest model)
        {
            var response = new Response();

            try
            {
                var result = _context.AtualizarAssociacao(model);

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

        [HttpDelete]
        [Route("ExcluirAssociacao")]
        public HttpResponseMessage ExcluirAssociacao(int cod)
        {
            var response = new Response();

            try
            {
                var result = _context.ExcluirAssociacao(cod);

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

        [HttpGet]
        [Route("ConsultarAssociacaoPeloID")]
        public HttpResponseMessage ConsultarAssociacaoPeloID(int cod)
        {
            var response = new Response();

            try
            {
                var result = _context.ConsultarAssociacaoPeloID(cod);

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
