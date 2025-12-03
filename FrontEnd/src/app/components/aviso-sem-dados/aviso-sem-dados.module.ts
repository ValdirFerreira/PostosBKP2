import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoSemDadosComponent } from './aviso-sem-dados.component';



@NgModule({
  declarations: [AvisoSemDadosComponent],
  imports: [
    CommonModule
  ],
  exports:[
    AvisoSemDadosComponent
  ]
})
export class AvisoSemDadosModule { }
