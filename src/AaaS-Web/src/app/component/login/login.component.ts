import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'aaas-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  
  loggedIn: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.auth.loginStatus
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => this.loggedIn = value);
  }
  
  logIn() {
    this.auth.login();
    // cannot redirect 
  }

  logOut() {
    this.auth.logout()
    // manualle move to home page
    this.router.navigateByUrl("home");
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
