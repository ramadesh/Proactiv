import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { min } from 'rxjs';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  
  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  showPassword: boolean = false;
  
  subscription: Subscription = new Subscription;

  //ngOnInit() {
    //this.subscription = this.data.currentUser.subscribe(u => this.usernameInput = u)
  //}
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(private http: HttpClient, public data: DataService) {
  }
  
  signup() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);
    this.data.user = this.usernameInput;

    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minChars = 8;
    var maxChars = 14;

    if (this.passInput.length < minChars || this.passInput.length > maxChars || !regularExpression.test(this.passInput)) {
      alert("Password must be minimum 8 characters, maximum 14 characters long and must contain at least one number and one special character.");
    } else {
      // Send the new user to the backend
    this.http.post('http://localhost:5002/userpass', {pass: this.passInput, userId: this.usernameInput, email: this.emailInput})
    .subscribe(response => {
      this.usernameInput = ''; // Clear the input fields
      this.passInput = ''; 
      this.emailInput = '';
      
      // Log a message when the registration is successfully saved
      console.log('User saved to the database.', response);
    }, (error) => {
      alert(error.error.error)
      //console.error('Error:', error.error.message);
       
      // this.toastr.error('Invalid username or password', 'Login Error');
    })
    }
  }
}
