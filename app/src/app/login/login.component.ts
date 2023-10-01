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
  showPassword: boolean = false;
  
  constructor(
    private http: HttpClient, public router: Router,
    private toastr: ToastrService 
    ) {}

  login() {
   
    const params = new HttpParams()
    .set('userId', this.usernameInput)
    .set('pass', this.passInput);

    this.http.get<any>('http://localhost:5002/userpass', { params })
    .subscribe(
      (response) => {
        // Handle the response data here
        localStorage.setItem("username", this.usernameInput);
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
