import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FiltroGlobalModule } from '../filtroGlobal/filtro-global.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    FiltroGlobalModule,
    TranslateModule,
    FormsModule,
    MatCheckboxModule,

  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
