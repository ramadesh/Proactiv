import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getDarkMode(): Observable<boolean> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subscriber) {
          console.log("Settings Service Error: username not found while getting dark mode status");
          subscriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username);

    return this.http.get<boolean>('http://localhost:5002/darkMode', { params });
  }

  updateDarkMode(darkMode : Boolean): Observable<Boolean> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subscriber) {
          console.log("Settings Service Error: username not found while getting dark mode status");
          subscriber.error("User not found");
      });
    }

    return this.http.put<Boolean>('http://localhost:5002/darkMode', {userId: username, darkMode: darkMode});
  }
}
