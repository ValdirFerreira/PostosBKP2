import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterBottomComponent } from './footer-bottom.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FooterBottomComponent,
    
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    FooterBottomComponent
  ]
})
export class FooterBottomModule { }
