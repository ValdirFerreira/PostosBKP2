import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPortaisComponent } from './sidebar-portais.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TraducaoService } from 'src/app/services/traducao-service';



@NgModule({
  declarations: [
    SidebarPortaisComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,

  ],
  exports: [
    SidebarPortaisComponent
  ]

})
export class SidebarPortaisModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TraducaoService(http);
}