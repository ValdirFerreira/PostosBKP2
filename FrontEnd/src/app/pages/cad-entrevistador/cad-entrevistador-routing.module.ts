import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadEntrevistadorComponent } from './cad-entrevistador.component';


const routes: Routes = [{
  path: '',
  component: CadEntrevistadorComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuHomeRoutingModule { }
