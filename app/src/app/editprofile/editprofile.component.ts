import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from "../data.service";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  public username = 'testpassword';
  public password = 'testpassword';
  public email = 'testemail';
  public school = 'testschool';
  public birthday = 'testbirthday';
  showPassword: boolean = false;

  constructor(private http: HttpClient, public data: DataService, public router: Router) { }

  editProfile() {
    console.log("username: " + this.username);
    console.log("pass: " + this.password);
    console.log("email: " + this.email);
    console.log("school: " + this.school);
    console.log("bday: " + this.birthday);

    this.data.user = this.username;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minChars = 8;
    var maxChars = 14;

    if (this.password.length < minChars || this.password.length > maxChars || !regularExpression.test(this.password)) {
      alert("Password must be minimum 8 characters, maximum 14 characters long and must contain at least one number and one special character.");
    } else {
      // Send the new user to the backend
    this.http.post('http://localhost:5002/userpass', {pass: this.password, userId: this.username, email: this.email, school: this.school, birthday: this.birthday})
    .subscribe(response => {
      this.username = ''; // Clear the input fields
      this.password = ''; 
      this.email = '';
      this.school = '';
      this.birthday = '';
      
      // Log a message when the registration is successfully saved
      console.log('User profile edits saved to the database.', response);
    }, (error) => {
      alert(error.error.error)
      //console.error('Error:', error.error.message);
       
      // this.toastr.error('Invalid username or password', 'Login Error');
    })
    }
  }

}

