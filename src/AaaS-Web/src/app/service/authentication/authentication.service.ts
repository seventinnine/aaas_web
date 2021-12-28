import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { }

  // broadcast change of login status to subscribers
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut(true);
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    const newStatus = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    this.loginStatus.next(newStatus);
    return newStatus;
  }

  getUserData(): string[] {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return [];
    return claims as string[];
  }

}
