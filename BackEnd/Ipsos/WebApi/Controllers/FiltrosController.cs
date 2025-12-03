using DataAccess.Filtros;
using DataAccess.LogUsuario;
using DataAccess.Traducao;
using DataAccess.Usuario;
using Entities.Filtros;
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

    [RoutePrefix("api/filtros")]

    [Authorize]
    public class FiltrosController : ApiController
    {

        private FiltrosDataAccess _context = new FiltrosDataAccess(string.Empty);

        [HttpPost]
        [Route("FiltroTarget")]
        public HttpResponseMessage FiltroTarget(ParamGeralFiltro filtro)
        {
            var response = new Response();
            try
            {
                var dados = _context.FiltroTarget(filtro);

                return Request.CreateResponse(HttpStatusCode.OK, dados);
            }
            catch (Exception ex)
            {
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Error = $"Bad request - ({ex.Message})";

                return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
            }
        }

   


        


    }
}
