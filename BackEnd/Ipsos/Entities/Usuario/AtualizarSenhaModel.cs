using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Usuario
{
    public class AtualizarSenhaModel
    {
        public string Token { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
    }
}
