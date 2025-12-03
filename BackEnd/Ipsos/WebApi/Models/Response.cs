using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Response
    {
        public Response()
        {
            this.Content = new List<JObject>();
            this.Error = string.Empty;
        }

        public Response(int _erroCode, string _statusCode)
        {
            this.StatusCode = _erroCode;
            this.Error = _statusCode;
            this.Content = new List<JObject>();
        }

        public int StatusCode { get; set; }

        public string Error { get; set; }

        public List<JObject> Content { get; set; }
    }
}