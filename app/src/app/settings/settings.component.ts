import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  profile : Profile = {
    userId : '',
    pass : '',
    email : '',
    school : '',
    birthday : ''
  };
  showPassword: boolean = false;

  constructor(private http: HttpClient, private profileService: ProfileService, public data: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
      console.log("username: " + this.profile.userId);
      console.log("pass: " + this.profile.pass);
      console.log("email: " + this.profile.email);
      console.log("school: " + this.profile.school);
      console.log("bday: " + this.profile.birthday);
    })
  }

  updateProfile() {
    this.data.user = this.profile.userId;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minChars = 8;
    var maxChars = 14;

    if (this.profile.pass.length < minChars || this.profile.pass.length > maxChars || !regularExpression.test(this.profile.pass)) {
      alert("Password must be minimum 8 characters, maximum 14 characters long and must contain at least one number and one special character.");
    } else {
      // Send the new user to the backend
      this.profileService.updateProfile(this.profile).subscribe((profile) => {
        console.log('Updated sucessfully');
      })

    }
  }
}
