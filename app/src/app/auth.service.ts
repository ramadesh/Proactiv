import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string ) {

    return this.http.post<any>('http://localhost:5002/userpass/login', {userId: username, pass: password}).pipe(shareReplay())
  }
}
