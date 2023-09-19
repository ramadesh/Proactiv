import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(
    private http: HttpClient, public router: Router,
    private toastr: ToastrService 
    ) {}

  login() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);

   
    const params = new HttpParams()
    .set('userId', this.usernameInput)
    .set('pass', this.passInput);

    this.http.get<any>('http://localhost:5002/userpass', { params })
    .subscribe(
      (response) => {
        // Handle the response data here
        this.router.navigate(["/dash"]);
      },
      (error) => {
        console.error('Error:', error.error.message);
        this.errorMessage = error.error.message
        // this.toastr.error('Invalid username or password', 'Login Error');
      }
    );
  }

}
