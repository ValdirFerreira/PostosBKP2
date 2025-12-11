import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/home/guards/auth-guard.service';
import { LoginComponent } from './pages/home/login/login.component';
import { RecuperarSenhaComponent } from './pages/home/recuperar-senha/recuperar-senha.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'recuperar-senha/:token',
    component: RecuperarSenhaComponent
  },

  { path: 'login', component: LoginComponent },
  // { path: '', component: LoginComponent },
  {
    path: 'index',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  }
  , {
    path: 'home',
    loadChildren: () => import('./pages/menu-home/menu-home.module').then(m => m.MenuHomeModule),
    // canActivate: [AuthGuard],
  }

   , {
    path: 'proprietario',
    loadChildren: () => import('./pages/cad-proprietario/cad-proprietario.module').then(m => m.CadProprietarioModule),
    // canActivate: [AuthGuard],
  }
    , {
    path: 'entrevistador',
    loadChildren: () => import('./pages/cad-entrevistador/cad-entrevistador.module').then(m => m.CadEntrevistadorModule),
    // canActivate: [AuthGuard],
  }
  , {
    path: 'pesquisav',
    loadChildren: () => import('./pages/pesquisa/pesquisa.module').then(m => m.PesquisaModule),
    // canActivate: [AuthGuard],
  }
  , {
    path: 'dashboard-one',
    loadChildren: () => import('./pages/dashboard-one/dashboard-one.module').then(m => m.DashboardOneModule),
    canActivate: [AuthGuard],
  }
  , {
    path: 'dashboard-awareness',
    loadChildren: () => import('./pages/dashboard-two/dashboard-two.module').then(m => m.DashboardTwoModule),
    canActivate: [AuthGuard],
  }, 
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [AuthGuard],
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
