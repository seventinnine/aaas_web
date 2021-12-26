import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanUseClientGuard implements CanActivate {

  constructor(protected router: Router, protected auth: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(
        ['/login'], 
        { queryParams: { returnUrl: state.url } }
      );
      return false;
    }
    return true;
  }
}
