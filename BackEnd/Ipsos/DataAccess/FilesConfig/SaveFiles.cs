using Helpers.Logtxt;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Web.UI.WebControls;
using Entities.DTOs;

namespace DataAccess.FilesConfig
{
    public class SaveFiles : IDisposable
    {

        private string VerificaDiretorio
        {
            get
            {
                var path = AppDomain.CurrentDomain.BaseDirectory;

                path += "Files";

                if (!System.IO.Directory.Exists(path))
                    System.IO.Directory.CreateDirectory(path);

                path += "\\";
                return path;
            }
        }



        public void SalvaArquivo(FilePostos arquivoFront)
        {

            var arquivo = new FilePostosBack();

            arquivo.BinFile = Convert.FromBase64String(arquivoFront.FileBase64);

            using (var outStream = new MemoryStream(arquivo.BinFile))
            {
                var diretorio = string.Concat(VerificaDiretorio, arquivoFront.Cod, ".PDF");

                if (File.Exists(diretorio))
                {
                    File.Delete(diretorio);
                }
                using (var fileStream = new FileStream(diretorio, FileMode.CreateNew, FileAccess.ReadWrite))
                {

                    outStream.CopyTo(fileStream); // fileStream is not populated
                }
            }
        }


        public FilePostos RecuperaArquivo(int cod)
        {

            FilePostos response = new FilePostos();

            var base64String = string.Empty;

            var diretorio = string.Concat(VerificaDiretorio, cod, ".PDF");

            using (var temp = new FileStream(diretorio, FileMode.Open))
            {

                using (var ms = new MemoryStream())
                {
                    temp.CopyTo(ms);
                    byte[] fileBytes = ms.ToArray();
                    response.FileBase64 = base64String = Convert.ToBase64String(fileBytes);


                }
            }

            return response;

        }


        //public void SalvaArquivo(Arquivo arquivo)
        //{

        //    using (var outStream = new MemoryStream(arquivo.BinFile))
        //    {
        //        var diretorio = string.Concat(VerificaDiretorio, arquivo.NameFile, arquivo.FileExension);

        //        if (File.Exists(diretorio))
        //        {
        //            File.Delete(diretorio);
        //        }
        //        using (var fileStream = new FileStream(diretorio, FileMode.CreateNew, FileAccess.ReadWrite))
        //        {

        //            outStream.CopyTo(fileStream); // fileStream is not populated
        //        }
        //    }
        //}




        //public bool DeleteFileOriginal(Arquivo arquivo, DadosTraducaoModel dadosTraducaoModel)
        //{
        //    var diretorio_1_Importacao = string.Concat(VerificaDiretorio, arquivo.IdFile, arquivo.FileExension);

        //    try
        //    {
        //        File.Delete(diretorio_1_Importacao); // Deletar somente o Arquivo de Upload e deixar o arquivo traduzido
        //        return true;

        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }


        //}


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }



    }
}
