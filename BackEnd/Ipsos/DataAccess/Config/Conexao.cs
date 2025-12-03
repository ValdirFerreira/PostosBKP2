using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Config
{
    public static class Conexao
    {
        static string sConexao;
        static string sConexaoEMS;

        static string sConexaoNestleGrupo;
        public static string strConexao
        {
            get
            {
                if (sConexao == null || sConexao.Length == 0)
                {
                    string sBanco = ConfigurationManager.AppSettings.Get("DbName");
                    bool bProducao = System.Convert.ToBoolean(ConfigurationManager.AppSettings.Get("IsProd"));

                    SisConn.clsAcessoBanco clsAcessoBanco = new SisConn.clsAcessoBanco();
                    sConexao = clsAcessoBanco.RetornaConexaoSSRS(sBanco, bProducao);
                }

                return sConexao;
            }

        }

        public static string strConexaoEMS
        {
            get
            {
                if (sConexaoEMS == null || sConexaoEMS.Length == 0)
                {
                    string sBanco = ConfigurationManager.AppSettings.Get("DbNameEMS");
                    bool bProducao = System.Convert.ToBoolean(ConfigurationManager.AppSettings.Get("IsProd"));

                    SisConn.clsAcessoBanco clsAcessoBanco = new SisConn.clsAcessoBanco();
                    sConexaoEMS = clsAcessoBanco.RetornaConexaoSSRS(sBanco, bProducao);
                }

                return sConexaoEMS;
            }

        }


        public static string strConexaoBHTNestleGrupo
        {
            get
            {
                if (sConexaoNestleGrupo == null || sConexaoNestleGrupo.Length == 0)
                {
                    string sBanco = ConfigurationManager.AppSettings.Get("DbNameGroup");
                    bool bProducao = System.Convert.ToBoolean(ConfigurationManager.AppSettings.Get("IsProd"));

                    SisConn.clsAcessoBanco clsAcessoBanco = new SisConn.clsAcessoBanco();
                    sConexaoNestleGrupo = clsAcessoBanco.RetornaConexaoSSRS(sBanco, bProducao);
                }

                return sConexaoNestleGrupo;
            }

        }

    }
}
