import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadProprietarioComponent } from './cad-proprietario.component';


const routes: Routes = [{
  path: '',
  component: CadProprietarioComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuHomeRoutingModule { }
