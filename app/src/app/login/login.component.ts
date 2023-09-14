import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  

  login() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);
  }

}
