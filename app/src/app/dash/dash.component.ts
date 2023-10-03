import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  constructor(private router: Router) { }
  
  logout() {
    this.router.navigate(["/login"]);
    console.log("You've been successfully logged out.");
  }
}
