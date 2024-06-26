import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {

  constructor(private http: HttpClient, private profileService : ProfileService, public router: Router) {

  }
  profile: Profile = {
    displayName: '',
    userId:  '',
    pass: '',
    email: '',
    birthday: '',
    secQ: ''
  }
  public usernameInput = '';
  public secQInput = '';
  
  async reset() {
    if (this.usernameInput == "" || this.secQInput == "") {
      alert("Please fill in all the fields");
    } else {
      this.profileService.verifySecQ(this.usernameInput, this.secQInput).subscribe((verified) => {
        if (!verified) {
          alert("Incorrect username or security answer.");
        } else {
          this.router.navigate( ["/resetpass"]);
        }
      })
    }
  }

}

  /*async reset() {
    if (this.usernameInput == "" || this.secQInput == "") {
      alert("Please fill in all the fields");
    } else {
      localStorage.setItem("username", this.usernameInput);
      this.profileService.getProfile().subscribe((profile) => {
        this.profile = profile;
        //console.log("user found: "+ profile.secQ);
        if (profile.secQ !== this.secQInput) {
          alert("Fields don't match!");
        } else {
          this.router.navigate( ["/dash"]);
        }
      })
    } 
  }*/

 /* DONT REMOVE THIS CODE COMMENT PLEASE - RAMA
    if (this.emailInput.indexOf('@') != -1) {
      var at = this.emailInput.indexOf('@');
      var afterAt = this.emailInput.substring(at + 1, this.emailInput.length);
      alert("after: " + afterAt)
      var beforeAt = this.emailInput.substring(0, at);
      alert("before: " + beforeAt)
      if (beforeAt.length >= 1 && afterAt.length >= 3 && afterAt.indexOf('.') != -1) {
        //send email here @ash-bizzle
      } else {
        alert("Please input a valid email.");
      }
    }
    else {
      alert("Please input a valid email.");
    }
    */