import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  constructor(private router: Router, public data: DataService, private settingsService: SettingsService, private auth: AuthService) { }
  
  public spotifyProfilePic = this.data.spotifyProfilePic;
  showNote = false;

  ngOnInit(): void {
    this.settingsService.getDarkMode().subscribe((mode) => {
      if(!mode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.add('dark-mode');
      }
    })
  }

  toggleNote() {
    this.showNote = !(this.showNote);
  }
  
  logout() {
    this.auth.logout();
    console.log("You've been successfully logged out.");
    this.router.navigate(["/login"]);
  }
}
