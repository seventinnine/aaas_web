import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'aaas-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginErrorOccured = false;

  loggedIn: boolean = false;
  
  private returnTo: string = '';

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl'])
    this.loggedIn = this.auth.isLoggedIn();
  }
  
  submitForm() {
    if (this.auth.login()) {
      this.router.navigateByUrl(this.returnTo);
      this.loginErrorOccured = false;
    } else {
      this.loginErrorOccured = true;
    }
  }

}
