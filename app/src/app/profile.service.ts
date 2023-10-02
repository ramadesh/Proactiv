import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Profile } from './profile';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Profile Service Error: username not found");
          subsriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username);

    return this.http.get<Profile>('http://localhost:5002/profile', { params });
  }

  updateProfile(profile : Profile): Observable<Profile> {
    if(profile == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Profile Service Error: profile is null");
          subsriber.error("Profile is null");
      });
    }

    console.log("username: " + profile.userId);
    console.log("pass: " + profile.pass);
    console.log("email: " + profile.email);
    console.log("school: " + profile.school);
    console.log("bday: " + profile.birthday);

    return this.http.put<Profile>('http://localhost:5002/profile', {pass: profile.pass, userId: profile.userId, email: profile.email, school: profile.school, birthday: profile.birthday});
  }
}