import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { }

  // broadcast change of login status to subscribers
  private loginStatusSource = new BehaviorSubject(false);
  loginStatus = this.loginStatusSource.asObservable();

  login(): void {
   this.oauthService.initCodeFlow();
   this.loginStatusSource.next(true);
  }

  logout(): void {
    // redirect back to previous page
    this.oauthService.logOut(true);
    this.loginStatusSource.next(false);
  }

  isLoggedIn(): boolean {
    const newStatus = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    this.loginStatusSource.next(newStatus);
    return newStatus;
  }

}
