import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router){ }

  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  

  login() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);

    const navigationDetails: string[] = ['/dashboard'];
    //validate username & password info
    this.router.navigate(navigationDetails);
  }

}
