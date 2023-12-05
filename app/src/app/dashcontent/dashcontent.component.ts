import { HttpClient, HttpParams } from '@angular/common/http';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DataService } from '../data.service';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { CommonModule } from '@angular/common';

/**
 * @title Card with sub-title
 */
@Component({
  selector: 'app-dashcontent',
  templateUrl: './dashcontent.component.html',
  styleUrls: ['./dashcontent.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class PastjournalsComponent {
  public userID = localStorage.getItem("username");
  public journals: any = [];
  public tasks: any = [];
  public spotifyProfilePic = this.data.spotifyProfilePic;
  
  profile : Profile = {
    displayName: '',
    userId : '',
    pass : '',
    email : '',
    birthday : '',
    secQ: ''
  };

  constructor(private http: HttpClient, public data: DataService, private profileService: ProfileService) {
    this.getJournals();
    this.getProfile();
    this.getTasks();
  }
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  
  getJournals() {
    //let params = new HttpParams().set('userId', this.userID!);
    let params = new HttpParams().set('userId', "ashsproactivtest");
    this.http.get('http://localhost:5002/dashjournals', { params })
    .subscribe(response => {
      console.log(response);
      this.journals = response;
    }, (error) => {
      // Handle errors
    });
  }
  getProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    })
  }
  getTasks() {
    let params = new HttpParams().set('userId', this.userID!);
    this.http.get('http://localhost:5002/todo', { params })
    .subscribe(response => {
      console.log(response);
      this.tasks = response;
    }, (error) => {
      // Handle errors
    });
  }

}
