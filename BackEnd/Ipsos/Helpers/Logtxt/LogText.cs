using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Logtxt
{
    public sealed class LogText : IDisposable
    {
        private static LogText instance;

        public static LogText Instance
        {
            get
            {
                return instance ?? (instance = new LogText());
            }
        }

        private string ChecarDiretorio
        {
            get
            {
                var path = AppDomain.CurrentDomain.BaseDirectory;

                path += "log";

                if (!System.IO.Directory.Exists(path))
                    System.IO.Directory.CreateDirectory(path);

                path += "\\";
                return path;
            }
        }

        public void Error(string Classe, string Metodo, string Mensagem)
        {
            //Task.Run(() =>
            //{
            //    using (var texto = new System.IO.StreamWriter($"{ChecarDiretorio}log_{DateTime.Now:yyyyMMdd}.log", true))
            //    {
            //        var textLog = new StringBuilder();

            //        textLog.Append("V1|");
            //        textLog.Append(DateTime.Now.ToString("HH:mm:ss.fff")).Append(" == ");

            //        Classe = char.ToUpper(Classe[0]) + Classe.Substring(1);
            //        Metodo = char.ToUpper(Metodo[0]) + Metodo.Substring(1);

            //        textLog.Append("Class: ").Append(Classe.PadRight(30));
            //        textLog.Append("Method: ").Append(Metodo.PadRight(40));
            //        textLog.Append("Routine: ").Append("ERROR***".PadRight(15));
            //        textLog.Append("Message: ").Append(Mensagem);
            //        textLog.Append("\r\n");

            //        texto.Write(textLog);
            //    }
            //});
        }

        public void Warning(string Classe, string Metodo, string Mensagem)
        {
            using (var texto = new System.IO.StreamWriter($"{ChecarDiretorio}log_{DateTime.Now:yyyyMMdd}.log", true))
            {
                var textLog = new StringBuilder();

                textLog.Append("V1|");
                textLog.Append(DateTime.Now.ToString("HH:mm:ss.fff")).Append(" == ");

                Classe = char.ToUpper(Classe[0]) + Classe.Substring(1);
                Metodo = char.ToUpper(Metodo[0]) + Metodo.Substring(1);

                textLog.Append("Class: ").Append(Classe.PadRight(30));
                textLog.Append("Method: ").Append(Metodo.PadRight(40));
                textLog.Append("Routine: ").Append("Warning***".PadRight(15));
                textLog.Append("Message: ").Append(Mensagem);
                textLog.Append("\r\n");
                texto.Write(textLog);
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
