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


    public class Postos
    {
        public int Cod { get; set; }

        public int CodIdioma { get; set; }

    }


    public class PostoFuncionarioCadastrarRequest
    {
        public int ParamCodPosto { get; set; }
        public int ParamCodFuncionarioFuncao { get; set; }
        public int ParamCodStatus { get; set; }
        public string ParamNome { get; set; }
        public string ParamEmail { get; set; }
    }


    public class PostoFuncionarioConsultarResponse
    {
        public int CodPostoFuncionario { get; set; }
        public int CodFuncao { get; set; }
        public string DescricaoFuncao { get; set; }
        public int CodStatus { get; set; }
        public string Status { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
    }

    /////////////////////////////////////////////////////////////////////////

    public class AssociacaoPostoConsultarResponse
    {
        public int CodPostoAssociacao { get; set; }
        public int CodPosto { get; set; }
        public int CodStatus { get; set; }
        public string Status { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeProprietario { get; set; }
        public string Bandeira { get; set; }
        public int QuantidadeFuncionarios { get; set; }
        public string Endereco { get; set; }
        public string Complemento { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string UF { get; set; }
    }


    public class AssociacaoPostoConsultarPeloIDResponse
    {
        public int CodPostoAssociacao { get; set; }
        public string RazaoSocial { get; set; }
        public string NomeProprietario { get; set; }
        public string Bandeira { get; set; }
        public int QuantidadeFuncionarios { get; set; }
        public string Endereco { get; set; }
        public string Complemento { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string UF { get; set; }
    }

    public class PostoAssociacaoCadastrarRequest
    {
        public int ParamCodProprietario { get; set; }
        public int ParamCodPosto { get; set; }
    }

    public class PostoAssociacaoAtualizarRequest
    {
        public int ParamCod { get; set; }
        public int ParamCodProprietario { get; set; }
        public int ParamCodPosto { get; set; }
        public int ParamCodStatus { get; set; }
    }


    public class PostoDadosResponse
    {
        public int CodPosto { get; set; }
        public string RazaoSocial { get; set; }
        public string Bandeira { get; set; }
        public string Endereco { get; set; }
        public string Complemento { get; set; }
        public string CEP { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string UF { get; set; }
    }


    public class PostoServicoConsultarResponse
    {
        public int CodPostoServico { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public int Ordem { get; set; }

        public PostoServicoConsultarResponse()
        {
            ListOpcoes = new List<PostoServicoOpcaoConsultarResponse>();
        }

        public List<PostoServicoOpcaoConsultarResponse> ListOpcoes { get; set; }
    }


    public class PostoServicoOpcaoConsultarResponse
    {
        public int CodServico { get; set; }
        public string DescricaoServico { get; set; }
        public int CodOpcao { get; set; }
        public string DescricaoOpcao { get; set; }
        public string Resposta { get; set; }
    }


    public class PostoServicoOpcaoAtualizarRequest
    {
        public int CodServicoOpcao { get; set; }
        public int CodServico { get; set; }
        public int CodPosto { get; set; }
        public int CodIdioma { get; set; }
    }









}
