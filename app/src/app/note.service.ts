import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNote(): Observable<string> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subscriber) {
          console.log("Note Service Error: username not found");
          subscriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username);

    return this.http.get<string>('http://localhost:5002/note', { params });
  }

  updateNote(text : String): Observable<Boolean> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subscriber) {
          console.log("Note Service Error: username not found");
          subscriber.error("User not found");
      });
    }

    return this.http.put<Boolean>('http://localhost:5002/note', {userId: username, note: text});
  }
}
