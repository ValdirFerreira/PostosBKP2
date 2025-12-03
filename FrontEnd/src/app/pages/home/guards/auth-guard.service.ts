import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {
  constructor(
    private authService: AuthService
    , private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(resolve =>
      this.authService.UsuarioEstaAutenticado().then(status => {
        let redirect: string = state.root.queryParams['redirect'];
        let blnUnAuthorize = false;

        console.log('Passou pelo Guardian')

        //validation
        if (status === false)
          blnUnAuthorize = true;
      
        //redirect
        if (blnUnAuthorize && redirect != null && redirect.length > 0)
          this.router.navigate(["home", "login", { redirect }]);
        else if (blnUnAuthorize)
         this.router.navigate(["home", "login"]);

        resolve(status);
      })
        .catch(() => {
          this.router.navigate(["home", "login"]);
          resolve(false);
        }))
  }
}

