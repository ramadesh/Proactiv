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
    displayName: '',
    userId : '',
    pass : '',
    email : '',
    birthday : '',
    secQ: ''
  };
  showPassword: boolean = false;

  constructor(private http: HttpClient, private profileService: ProfileService, public data: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
    console.log(this.getProfile());
  }

  getProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    })
  }

  updateProfile() {
    this.data.user = this.profile.userId;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var minChars = 8;
    var maxChars = 14;

    if (this.profile.pass.length != 0 && (this.profile.pass.length < minChars || this.profile.pass.length > maxChars || !regularExpression.test(this.profile.pass))) {
      alert("Password must be minimum 8 characters, maximum 14 characters long and must contain at least one number and one special character.");
    } else {
      // Send the new user to the backend
      this.profileService.updateProfile(this.profile).subscribe((profile) => {
        console.log('Updated sucessfully');
      })

    }
  }

  deleteUser() {
    this.profileService.deleteProfile().subscribe((message) => {
      localStorage.removeItem("username");
      console.log(message);
    })
    this.router.navigate(["/login"]);
  }

  confirmDeletion(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (isConfirmed) {
      this.deleteUser()
    } else {
      console.log('Deletion canceled.');
    }
  }
}
