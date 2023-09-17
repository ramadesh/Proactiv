import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  showPassword: boolean = false;
  
  constructor(private http: HttpClient) {

  }
  
  signup() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);

    // Send the new user to the backend
    this.http.post('http://localhost:5002/userpass', {pass: this.passInput, userId: this.usernameInput, email: this.emailInput})
      .subscribe(response => {
        this.usernameInput = ''; // Clear the input fields
        this.passInput = ''; 
        this.emailInput = '';
        
        // Log a message when the registration is successfully saved
        console.log('User saved to the database.', response);
      })
  }
}
