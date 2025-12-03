using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.ExportacaoExcel
{
    public class ExcelUtil

    {
        //Array com as letras das colunas

        public static String[] letras = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",

                                          "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};

        //Função que retornar a letra da coluna pelo índice

        public static String GetColumnLetterByIndex(Int32 col)
        {
            String celula = "";

            //Aqui verificamos se a coluna passada é maior do que 26
            //pois 26 equivale a ultima letra do excel, "Z"

            //a partir daí começamos a ter duas letras... AA, AB, AC, AD...

            if (col > 26)

            {
                //Aqui pegamos o valor absoluto do resultado da divisão do numero da coluna por 26

                //Este é o indice da primeira letra de nossa coluna

                //Ex.: Col = 50 -> 50/26 = 1,92

                //     idxPrimeiraLetra = 1

                Int32 idxPrimeiraLetra = Math.Abs(col / 26);

                //Para buscarmos o segundo índice, precisamos de um cálculo diferente
                //Devemos pegar a diferença entre o indice da coluna a ser localizada

                //e resultado da multiplicacao do indice da primeira letra por 26

                //Ex.: idxSegundaLetra = 50 - (1 * 26)

                //     idxSegundaLetra = 24

                Int32 idxSegundaLetra = col - (Math.Abs(col / 26) * 26);

                //Aqui verificamos se o indice da segunda letra é zero
                //isto acontecerá quando a coluna localizada for multiplo de 26, neste caso precisamos

                //considerar a ultima letra, sendo esta o índice 25 de nosso array

                //Caso contrário, retornamos concatenado de acordo com nosso array

                //as letras do indice da primeira e segunda letras respectivamente

                //Ex.: idxPrimeiraLetra = 1

                //     idxSegundaLetra = 24

                //     celula = AX

                if (idxSegundaLetra == 0)

                    celula = String.Concat(letras[idxPrimeiraLetra - 2], letras[25]);
                else

                    celula = String.Concat(letras[idxPrimeiraLetra - 1], letras[idxSegundaLetra - 1]);
            }
            else
                //Se for menor que 26, não há calculos a fazer, basta localizarmos no array

                celula = letras[col - 1];

            return celula;
        }

        //Função que retorna a célula pelo indice da coluna e número da linha
        public static String GetCelulaByColumnIndex(Int32 col, Int32 row)
        {
            //buscamos a letra referente a coluna

            String celula = ExcelCellAddress.GetColumnLetter(col); // A 
            //GetColumnLetterByIndex(col);
            //concatenamos com a linha passada no parâmetro
            return String.Concat(celula, row.ToString());
        }
    }
}
