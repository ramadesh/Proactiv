import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  constructor(private router: Router, public data: DataService) { 

  }
  
  public spotifyProfilePic = this.data.spotifyProfilePic;

  
  logout() {
    this.router.navigate(["/login"]);
    console.log("You've been successfully logged out.");
  }
}
