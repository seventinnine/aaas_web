import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'aaas-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'AaaS-Web';
  loggedIn: boolean = false;

  constructor(
    private oauthService: OAuthService,
    private auth: AuthenticationService,
    private router: Router
    ) {
    this.configureWithNewConfigApi();
    this.auth.loginStatus.subscribe(value => this.loggedIn = value);
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


}