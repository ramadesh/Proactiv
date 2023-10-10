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

    return this.http.put<Profile>('http://localhost:5002/profile', {pass: profile.pass, userId: profile.userId, email: profile.email, birthday: profile.birthday, secQ: profile.secQ, displayName: profile.displayName});
  }

  deleteProfile(): Observable<Profile> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Profile Service Error: username not found");
          subsriber.error("User not found");
      });
    }

    return this.http.put<Profile>('http://localhost:5002/profile/delete', {userId: username});
  }

  verifySecQ(username : String, secQ : String): Observable<Boolean> {
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Profile Service Error: username not found");
          subsriber.error("User not found");
      });
    }
    console.log("username: " + username);
    console.log("secQ: " + secQ);
    return this.http.put<Boolean>('http://localhost:5002/profile/verifySecQ', {userId: username, secQ: secQ});
  }
}
