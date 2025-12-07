using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class FilePostos
    {
        public int Cod { get; set; }

        public string NomeArquivo { get; set; }

        public string FileBase64 { get; set; }

        public string FileExension { get; set; }
    }


    public class FilePostosBack
    {
        public int Cod { get; set; }

        public string NomeArquivo { get; set; }

        public byte[] BinFile { get; set; }

        public string FileExension { get; set; }
    }
   
}
