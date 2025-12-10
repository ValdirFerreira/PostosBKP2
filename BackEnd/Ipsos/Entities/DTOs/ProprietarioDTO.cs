using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class ProprietarioDTO
    {
        public int Cod { get; set; }
        public string Nome { get; set; }

        public int CodStatus { get; set; }

        public string DescricaoStatus { get; set; }

        public string Funcao { get; set; }

        public string Documento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }



}
