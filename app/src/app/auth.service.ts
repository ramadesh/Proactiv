import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username = "";

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    this.username = username;
    return this.http.post<any>('http://localhost:5002/userpass/login', {userId: username, pass: password}).pipe(
      tap(authResult => this.setSession(authResult)),
      shareReplay()
    )
  }

  private setSession(authResult: { expiresIn: string; idToken: string; }) {    
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem("username", this.username);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }    
}
