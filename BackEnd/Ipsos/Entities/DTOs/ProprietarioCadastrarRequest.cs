using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ProprietarioCadastrarRequest
    {
        public int Cod { get; set; }
        public string Nome { get; set; }
        public string Documento { get; set; }
        public int Status { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }




    public class ProprietarioCadastrarRequestID
    {
        public int Cod { get; set; }
        public string Nome { get; set; }
        public string Documento { get; set; }
        public int CodStatus { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }

}
