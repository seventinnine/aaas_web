import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, skip, take, timeout } from 'rxjs';
import { AaasApiService } from '../service/aaas-api/aaas-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppKeyGuard implements CanActivate {

  // prevents user from loading pages without setting an api key first
  constructor(
    protected apiService: AaasApiService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    /*
    if (this.apiService.validAppKeySet()) {

      return true
    }
    this.router.navigateByUrl('/home');
    return false;
    */

    return new Observable<boolean>(obs => 
      this.apiService.appKeyAccepted
      .subscribe((found: boolean) => {
        if (!found) this.router.navigateByUrl('/home');
        return obs.next(found);
      })
    );
  }
  
}
