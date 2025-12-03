using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApi.Models
{
    public class ArquivoResult : IHttpActionResult
    {
        private MemoryStream arquivoStuff;
        private string nomeDoArquivo;
        private HttpRequestMessage httpRequestMessage;
        private HttpResponseMessage httpResponseMessage;

        public ArquivoResult(MemoryStream data, HttpRequestMessage request, string filename)
        {
            arquivoStuff = data;
            httpRequestMessage = request;
            nomeDoArquivo = filename;
        }

        public Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {
            httpResponseMessage = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(arquivoStuff);
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.
    ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = nomeDoArquivo;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers
    .MediaTypeHeaderValue("application/octet-stream");
            return System.Threading.Tasks.Task.FromResult(httpResponseMessage);
        }
    }
}