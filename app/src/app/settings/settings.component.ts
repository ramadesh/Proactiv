import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { SettingsService } from '../settings.service';

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
  darkMode: boolean = false;

  constructor(private http: HttpClient, private profileService: ProfileService, private settingsService: SettingsService, public data: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
    this.getDarkMode();
    console.log(this.getProfile());
    console.log(this.getDarkMode());
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

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.settingsService.updateDarkMode(this.darkMode);
    var element = document.getElementById("test");
    console.log("Element: " + element);
    if(element != null) {
      console.log("toggle dark mode: element is not null");
      element.classList.toggle("dark-mode");
    }
  }

  getDarkMode() {
    this.settingsService.getDarkMode().subscribe((mode) => {
      this.darkMode = mode;
    })
  }
}
