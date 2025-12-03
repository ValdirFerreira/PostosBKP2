using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Usuario
{
    public class UsuarioModel
    {
        public int CodUser { get; set; }

        public string Name { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public int CodUserPerfil { get; set; }

        public bool FlagAtivo { get; set; }

        public string Token { get; set; }

        public bool FlagPopUp { get; set; }

        public string Portais { get; set; }

        public string IP { get; set; }

    }
}
