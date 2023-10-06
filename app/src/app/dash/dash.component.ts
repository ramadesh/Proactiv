import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  constructor(private router: Router, public data: DataService, private auth: AuthService) { }
  
  public spotifyProfilePic = this.data.spotifyProfilePic;
  
  logout() {
    this.auth.logout();
    console.log("You've been successfully logged out.");
    this.router.navigate(["/login"]);
  }
}
