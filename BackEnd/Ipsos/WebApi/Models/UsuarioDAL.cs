using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public static class UsuarioDAL
    {
        public static bool ValidateUser(string pLogin, string pPassword)
        {
            if (pLogin == Usuario.Email)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    public class Usuario
    {
        public static int CodUser { get; set; }
        public static string Name { get; set; }
        public static string Email { get; set; }
        public static string Password { get; set; }
        public static bool FlagAcessoVendas { get; set; }
        public static bool FlagAcessoPosVendas { get; set; }
        public static int CodMontadora { get; set; }
    }
}