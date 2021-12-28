import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { AaasApiService } from './service/aaas-api/aaas-api.service';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'aaas-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'AaaS-Web';
  loggedIn: boolean = false;
  apiKeyValid!: boolean;
  userData: any;

  constructor(
    private oauthService: OAuthService,
    private apiService: AaasApiService,
    private auth: AuthenticationService,
    private router: Router
    )
  {
    this.configureWithNewConfigApi();
    this.apiService.tryLoadAppKeyFromLocalStorage(); // bad idea
    this.apiService.appKeyAccepted
      .subscribe(valid => this.apiKeyValid = valid);
    this.auth.loginStatus
      .subscribe(status => {
        if (!status) this.loggedIn = false;
      });
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // please only check for login status after being completing login or else .. (there is no else .. there's not even an if :P)
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.userData = this.auth.getUserData();
      this.loggedIn = this.auth.isLoggedIn();
    });
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/home");
  }


}