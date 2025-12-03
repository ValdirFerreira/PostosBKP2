using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.TraducaoIdioma
{
    public  class TraducaoComponente
    {
        public int Id { get; set; }
        public int IdiomaId { get; set; }
        public string Objeto { get; set; }
        public string Texto { get; set; }
    }
}
