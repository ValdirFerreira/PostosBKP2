using DataAccess.DashBoardTwo;
using DataAccess.Traducao;
using Entities.Parametros;
using Helpers.Logtxt;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;




namespace WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/DashBoardTwo")]

    [Authorize]
    public class DashBoardTwoController : ApiController
    {

        private DashBoardTwoDataAccess _context = new DashBoardTwoDataAccess(Usuario.Email);




        [HttpPost]
        [Route("CarregarGraficoComparativoMarcas")]
        public HttpResponseMessage CarregarGraficoComparativoMarcas(FiltroPadrao filtro)
        {
            var response = new Response();
            try
            {
                //var list =  _context.CarregarGraficoComparativoMarcas(filtro);

                // return Request.CreateResponse(HttpStatusCode.OK, list);

                return null;

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
