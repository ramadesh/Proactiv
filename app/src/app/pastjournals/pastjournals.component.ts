import { HttpClient, HttpParams } from '@angular/common/http';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Card with sub-title
 */
@Component({
  selector: 'app-pastjournals',
  templateUrl: './pastjournals.component.html',
  styleUrls: ['./pastjournals.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class PastjournalsComponent {
  public userID = localStorage.getItem("username");
  public journals: any = [];

  constructor(private http: HttpClient) {
    this.getTasks();
  }
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  
  getTasks() {
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

}
