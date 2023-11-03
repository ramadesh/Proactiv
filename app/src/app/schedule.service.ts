import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getAllScheduleEvents(): Observable<Schedule[]> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: username not found");
          subsriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username);
    return this.http.get<Schedule[]>('http://localhost:5002/schedule', { params });
  }

  getScheduleEvent(eventId : String): Observable<Schedule> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: username not found");
          subsriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username);
    return this.http.get<Schedule>('http://localhost:5002/schedule/' + eventId, { params });
  }

  getScheduleEventsForDate(date : string): Observable<Schedule[]> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: username not found");
          subsriber.error("User not found");
      });
    }
    const params = new HttpParams().set('userId', username).set('date', date);
    return this.http.get<Schedule[]>('http://localhost:5002/schedule/', { params });
  }

  createScheduleEvent(scheduleEvent : Schedule): Observable<Schedule> {
    if(scheduleEvent == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: schedule event is null");
          subsriber.error("Schedule event is null");
      });
    }

    const username = localStorage.getItem("username");
    const newEvent = { eventId : scheduleEvent.eventId, userId : username, title : scheduleEvent.title, details : scheduleEvent.details, start : scheduleEvent.start, end : scheduleEvent.end };
    return this.http.post<Schedule>('http://localhost:5002/schedule', newEvent);
  }

  updateScheduleEvent(scheduleEvent : Schedule): Observable<Schedule> {
    if(scheduleEvent == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: schedule event is null");
          subsriber.error("Schedule event is null");
      });
    }

    const newEvent = { eventId : scheduleEvent.eventId, userId : scheduleEvent.userId, title : scheduleEvent.title, details : scheduleEvent.details, start : scheduleEvent.start, end : scheduleEvent.end };
    return this.http.put<Schedule>('http://localhost:5002/schedule', newEvent);
  }

  deleteScheduleEvent(eventId : String): Observable<Schedule> {
    const username = localStorage.getItem("username");
    if(username == null) {
      return new Observable(function subscribe(subsriber) {
          console.log("Schedule Service Error: username not found");
          subsriber.error("User not found");
      });
    }

    const params = new HttpParams().set('userId', username);
    return this.http.delete<Schedule>('http://localhost:5002/schedule/' + eventId, { params });
  }

}
