using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DashBoardTwo
{
    public static class SqlErrorTranslator
    {
        public static string Translate(SqlException ex)
        {
            switch (ex.Number)
            {
                // UNIQUE / PRIMARY KEY
                case 2601:
                case 2627:
                    return "Este registro já existe. Verifique os dados duplicados.";

                // Foreign Key
                case 547:
                    return "Não é possível excluir ou alterar este registro porque ele está em uso por outro processo.";

                // Campo obrigatório
                case 515:
                    return "Existem campos obrigatórios que não foram preenchidos.";

                // Deadlock
                case 1205:
                    return "Ocorreu um conflito interno no banco (deadlock). Tente novamente.";

                // Lock timeout
                case 1222:
                    return "A operação demorou devido a bloqueios internos. Tente novamente.";

                // Timeout
                case -2:
                    return "O tempo limite de execução foi excedido.";

                // Conexão
                case 53:
                    return "Não foi possível conectar ao servidor de banco de dados.";

                case 4060:
                    return "Banco de dados indisponível ou você não tem permissão.";

                case 18456:
                    return "Falha ao autenticar no banco de dados.";

                // Conversão
                case 245:
                case 8114:
                    return "Formato inválido em um dos campos. Verifique os valores informados.";

                // Nome errado
                case 207:
                    return "Coluna não encontrada no banco de dados.";

                case 208:
                    return "Objeto de banco de dados não encontrado.";

                case 2812:
                    return "Stored procedure informada não existe.";

                // Truncamento
                case 8152:
                    return "Um dos campos excede o tamanho permitido.";

                // Armazenamento
                case 1105:
                    return "O banco de dados ficou sem espaço.";

                case 701:
                    return "Falta de memória no servidor de banco.";

                default:
                    return $"Erro no banco de dados (código {ex.Number}). Tente novamente.";
            }
        }
    }

}
