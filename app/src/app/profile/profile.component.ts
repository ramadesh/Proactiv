import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Profile } from '../profile';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile : Profile = {
    displayName: '',
    userId : '',
    pass : '',
    email : '',
    birthday : '',
    secQ: ''
  };
  constructor(private http: HttpClient, private profileService: ProfileService, public data: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    })
  }
  
  public spotifyProfilePic = this.data.spotifyProfilePic;
}
