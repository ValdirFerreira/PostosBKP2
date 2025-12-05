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
    if (data) {
      this.valorEditado = this.formatarValorParaEdicao(data.valor || '');
      this.descricao = data.descricao || '';
      this.mes = data.mes || '';
      this.typeDialog = data.typeDialog ?? 0;
    }
  }

  ngOnInit(): void { }

  closeDialog() {
    this.dialogRef.close(this.confirmation ? this.formatarValorParaSalvar(this.valorEditado) : undefined);
  }

  aprovar() {
    if (this.typeDialog === 3 && !this.isNullOrEmpty(this.textObservacao)) {
      this.confirmation = true;
    } else if (this.typeDialog === 1) {
      this.confirmation = true;
       this.dialogRef.close("1");
       return;
    } else {
      this.confirmation = true;
    }
    this.closeDialog();
  }

  observacaoEstaVazia(): boolean {
    return this.isNullOrEmpty(this.textObservacao);
  }

  isNullOrEmpty(value: string): boolean {
    return value?.trim()?.length <= 0;
  }

  salvarEdicao() {
    this.confirmation = true;
    this.closeDialog();
  }

  formatarValorParaEdicao(valor: string): string {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(/,/g, '.'));
    return isNaN(valorNumerico)
      ? ''
      : valorNumerico.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }

  formatarValorParaSalvar(valor: string): string {
    // Remove tudo que não for número ou vírgula e converte para padrão BR
    const apenasNumeros = valor.replace(/[^0-9,]/g, '');
    return apenasNumeros;
  }

  formatarValorNumerico(event: any) {
    let valor = event.target.value;

    // Remove tudo que não for dígito
    valor = valor.replace(/\D/g, "");

    // Converte para centavos (ex: 123456 → "1234,56")
    if (valor.length > 2) {
      valor = valor.replace(/(\d+)(\d{2})$/, "$1,$2");
    }

    // Insere os pontos de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    this.valorEditado = valor;
  }


//   @HostListener('document:keydown.enter', ['$event'])
//   handleEnter(event: KeyboardEvent) {
//     if (this.typeDialog === 99) {
//       this.salvarEdicao();
//     }
//   }
}