using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class EntrevistadorCadastrarRequest
    {
        public string ParamNome { get; set; }
        public string ParamEmail { get; set; }
        public string ParamTelefone { get; set; }
        public string ParamDocumento { get; set; }
        public int ParamCodStatus { get; set; }
    }

    public class EntrevistadorAtualizarRequest
    {
        public int ParamCod { get; set; }
        public string ParamNome { get; set; }
        public string ParamEmail { get; set; }
        public string ParamTelefone { get; set; }
        public string ParamDocumento { get; set; }
        public int ParamCodStatus { get; set; }
    }

    public class EntrevistadorDTO
    {
        public int CodEntrevistador { get; set; }
        public string Nome { get; set; }
        public string Documento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int CodStatus { get; set; }
        public string Status { get; set; }
    }



}
