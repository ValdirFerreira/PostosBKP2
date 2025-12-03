import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGlobalComponent } from './filtro-global.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import {} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FiltroGlobalComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule ,
    TranslateModule
  ],
  exports: [
    FiltroGlobalComponent
  ]
})
export class FiltroGlobalModule { }
