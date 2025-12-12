import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import QRCodeGen from 'qrcode-generator';
import { PadraoComboFiltro } from 'src/app/models/padrao-combo-filtro/padrao-combo-filtro';
import { AssociacaoPostoConsultarResponse, PostoDadosResponse } from 'src/app/models/PainelPostos/FilePostos';
import { PainelPostosService } from 'src/app/services/painel-postos.service';
import { environment } from 'src/environments/environment';
export enum DialogTypeEnum {
    Transcription = 1,
    AudioVoice = 2,
}

@Component({
    selector: 'dialog-qrcode',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    templateUrl: './dialog-qrcode.component.html',
    styleUrls: ['./dialog-qrcode.component.scss']
})
export class DialogQrCodeComponent implements OnInit {
    typeDialog: number = 0;

    // postoModel = new PadraoComboFiltro();
    modelPosto = new AssociacaoPostoConsultarResponse();
    idPosto: number = 0;

    constructor(
        private dialogRef: MatDialogRef<DialogQrCodeComponent>,
        public dialog: MatDialog,
        public service: PainelPostosService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit(): void {
        this.gerarQrCode();
    }

    close() {
        this.dialogRef.close();
    }

    closeDialog() {
        // this.dialogRef.close(this.confirmation ? this.sairCadastroProprietario() : undefined);

        this.dialogRef.close({ cancel: true, data: "algum valor" });
    }

    private readonly basendPointPortal = environment["endPointPortal"];
    qrHtml: any;
    gerarQrCode() {
        const url = `${this.basendPointPortal}/#/pesquisav?idposto=` + this.modelPosto.CodPosto;

        const qr = QRCodeGen(0, 'L');
        qr.addData(url);
        qr.make();

        this.qrHtml = qr.createImgTag(6); // cria a imagem do QR
    }


    imprimir() {
        debugger
        const conteudo = document.getElementById('content')?.innerHTML;

        if (!conteudo) return;

        const janela = window.open('', '', 'width=800,height=600');

        if (janela) {
            janela.document.write(`
      <html>
        <head>
            <title>Impressão</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                text-align: center;
              }
              img { 
                max-width: 300px;
              }
            </style>
        </head>
        <body>
            ${conteudo}
        </body>
      </html>
    `);

            janela.document.close();

            // aguarda o layout carregar antes de imprimir
            janela.onload = () => {
                janela.print();
                janela.close();
            };
        }
    }

}