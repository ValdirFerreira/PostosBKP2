import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';




const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [{
      path: 'login', component: LoginComponent
    },
    // { path: '', component: LoginComponent },
    {
      path: 'recuperar-senha/:token',
      component: RecuperarSenhaComponent
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
