import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

let parameters = {
  count : false,
  numbers : false,
  letters: false,
  special: false
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  public usernameInput = '';
  public passInput = '';
  public emailInput = '';
  public schoolInput = '';
  public secQInput = '';
  public bdayInput = '';
  public monthInput: string = '';
  public dayInput: string = '';
  public yearInput: string = '';

  showPassword: boolean = false;

  constructor(private http: HttpClient, public data: DataService, public router: Router) {
  }


  strengthChecker() {
    let password = this.passInput

    parameters.letters = (/[A-Za-z]+/.test(password))? true:false
    parameters.numbers = (/[0-9]+/.test(password))? true:false
    parameters.special = (/[!@#$%^&*()_+\[\]:;,.?~\\/-]+/.test(password))? true:false
    parameters.count = (password.length >= 8)? true:false

    let strengthBar = document.getElementById("strength-bar")
    let message = document.getElementById("message")
    // console.log(strengthBar)
    if (strengthBar) {
      strengthBar.innerHTML = '';
      let barlength = Object.values(parameters).filter(value=>value)
      // console.log(barlength)
    
      for (let i = 0; i < barlength.length; i++) {
        let span = document.createElement("div");
        span.classList.add('strength');
        strengthBar.appendChild(span);
        // console.log(strengthBar)

        let spanRef = document.getElementsByClassName("strength") as HTMLCollectionOf<HTMLElement>
        for (let j = 0; j < spanRef.length; j++) {
          switch(spanRef.length - 1) {
            case 0:
              spanRef[j].style.background = "#ff3e36"
              if (message) {
                message!.textContent = "Your password is very weak"
              }
              break
            case 1:
              spanRef[j].style.background = "#ff691f"
              if (message) {
                message!.textContent = "Your password is weak"
              }
              break
            case 2:
              spanRef[j].style.background = "#ffda36"
              if (message) {
                message!.textContent = "Your password is good"
              }
              break
            case 3:
              spanRef[j].style.background = "#0be881"
              if (message) {
                message!.textContent = "Your password is strong"
              }
              break
          }
        }
      }
    }
  }
  
  updateBdayInput() {
    // Combine the selected month, day, and year into a single bdayInput
    this.bdayInput = `${this.monthInput}/${this.dayInput}/${this.yearInput}`;
  }

  signup() {
    console.log("username: " + this.usernameInput);
    console.log("pass: " + this.passInput);
    console.log("email: " + this.emailInput);
    this.data.user = this.usernameInput;
    console.log("school: " + this.schoolInput);
    console.log("bday: " + this.bdayInput);
    
    if ((this.passInput == "") || (this.usernameInput == "") || (this.emailInput == "") || (this.monthInput == null) || (this.dayInput == "") || (this.yearInput == "") || (this.schoolInput == "")) {
      alert("Please fill in all the fields");
    } else {

      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minChars = 8;
    var maxChars = 14;

    if (this.passInput.length < minChars || this.passInput.length > maxChars || !regularExpression.test(this.passInput)) {
      alert("Password must be minimum 8 characters, maximum 14 characters long and must contain at least one number and one special character.");
    } else {
      // Send the new user to the backend
    this.http.post('http://localhost:5002/userpass', {pass: this.passInput, userId: this.usernameInput, email: this.emailInput, school: this.schoolInput, birthday: this.bdayInput})
    .subscribe(response => {
      this.usernameInput = ''; // Clear the input fields
      this.passInput = ''; 
      this.emailInput = '';
      this.schoolInput = '';
      this.bdayInput = '';
      
      // Log a message when the registration is successfully saved
      console.log('User saved to the database.', response);
      var jsonString = JSON.stringify(response);
      var jsonObj = JSON.parse(jsonString);
      var tokenJson = jsonObj.token;
      this.data.token = tokenJson;
      
      this.router.navigate(["/verify"]);
    }, (error) => {
      alert(error.error.error)
    })
    }
    }

    
  }
}
