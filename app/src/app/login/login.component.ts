import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  public errorMessage = '';
  showPassword: boolean = false;
  
  constructor(
    private http: HttpClient, public router: Router,
    private toastr: ToastrService, public auth: AuthService 
    ) {}

  login() {
    this.auth.login(this.usernameInput, this.passInput)
    .subscribe(
      (response) => {
        // Handle the response data here
        console.log('Login successful');
        localStorage.setItem("username", this.usernameInput);
        this.router.navigate(["/dash"]);
      },
      (error) => {
        console.error('Error:', error.error.message);
        this.errorMessage = error.error.message;
      }
    );
  }
}
