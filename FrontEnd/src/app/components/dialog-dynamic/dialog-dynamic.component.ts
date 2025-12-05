import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

export enum DialogTypeEnum {
    Transcription = 1,
    AudioVoice = 2,
}

@Component({
    selector: 'dialog-dynamic',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    templateUrl: './dialog-dynamic.component.html',
    styleUrls: ['./dialog-dynamic.component.scss']
})
export class DialogDynamicComponent implements OnInit {
    typeDialog: number = 0;
    titlePopup: string = '';
    textOrAudio: string = '';
    textObservacao: string = '';
    mensagensErro: string[] = [];
    confirmation: boolean = false;

    valorEditado: string = '';
    descricao: string = '';
    mes: string = '';



    constructor(
        private dialogRef: MatDialogRef<DialogDynamicComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit(): void {
        this.retornCancel = false;
    }

    closeDialog() {
        // this.dialogRef.close(this.confirmation ? this.sairCadastroProprietario() : undefined);

          this.dialogRef.close({ cancel: true, data: "algum valor" });
    }


    retornCancel: boolean = false;
    sairCadastroProprietario() {
        this.retornCancel = true;
    }


}