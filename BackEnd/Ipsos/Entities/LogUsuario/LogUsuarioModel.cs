using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.LogUsuario
{
    public class LogUsuarioModel
    {
        public int IdLog { get; set; }
        public int? CodUser { get; set; }
        public string Email { get; set; }
        public DateTime? DataLog { get; set; }
        public string Informacao { get; set; }

        public string URL { get; set; }
        public string IP { get; set; }
    }
}
