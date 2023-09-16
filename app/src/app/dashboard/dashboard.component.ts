import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router){ }

  logout() {
    const navigationDetails: string[] = ['/login'];
    this.router.navigate(navigationDetails);
    console.log("You've been successfully logged out.");
  }
}
