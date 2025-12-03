import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TraducaoService } from 'src/app/services/traducao-service';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,

  ],
  exports: [
    SidebarComponent
  ]

})
export class SidebarModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TraducaoService(http);
}