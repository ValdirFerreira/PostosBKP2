using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class PesquisaQuestaoListagemResponse
    {
        public int CodPesquisaListagemQuestao { get; set; }
        public int CodSegmento { get; set; }
        public string Segmento { get; set; }
        public int CodTituloBloco { get; set; }
        public string TituloBloco { get; set; }
        public int CodVariavel { get; set; }
        public string Variavel { get; set; }
        public string Descricao { get; set; }

        public PesquisaQuestaoListagemResponse()
        {
            ListOpcoes = new List<PesquisaQuestaoOpcaoResponse>();
        }

        public List<PesquisaQuestaoOpcaoResponse> ListOpcoes { get; set; }
    }

    public class PesquisaQuestaoOpcaoResponse
    {
        public int CodPesquisaListagemQuestao { get; set; }
        public int CodSegmento { get; set; }
        public string Segmento { get; set; }
        public int CodTituloBloco { get; set; }
        public string TituloBloco { get; set; }
        public int CodVariavel { get; set; }
        public string Variavel { get; set; }
        public string Opcao { get; set; }
        public string Descricao { get; set; }
    }

    public class PesquisaRequest
    {

        public int CodSegmento { get; set; }
        public int CodIdioma { get; set; }

    }


    public class PesquisaVerificaRespostaRequest
    {
        public string ParamDocumento { get; set; }
    }


    public class PesquisaVerificaRespostaResponse
    {
        public int PassagemCliente { get; set; }
    }


    public class PesquisaRespostaCadastrarRequest
    {
        public string ParamRespostas { get; set; }
        public int ParamCodSegmento { get; set; }
        public string ParamClienteDocumento { get; set; }
        public int ParamCodPosto { get; set; }
    }

    public class PesquisaRespostaCadastrarResponse
    {
        public int CodCliente { get; set; }
        public int ErroCadastro { get; set; }
    }





}
