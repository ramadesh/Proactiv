import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent {

  constructor(public http: HttpClient, private scheduleService: ScheduleService) {

  }
  // Define the data for your calendar, e.g., tasks for each day.
  public currentDate = moment(); // Initialize with the current date
  public userID = localStorage.getItem("username");
  public tasks: any = [];
  public schedule: Schedule[] = [];

  selectedDate: string | null = null;


  // Function to show tasks for a specific date
  showTasksForDate(dateKey: string) {
    this.selectedDate = dateKey;
    this.getTasks();
    this.getSchedule();
  }

  getTasks() {
    let params = new HttpParams().set('userId', this.userID!)
    .set('due', this.selectedDate!);
    this.http.get('http://localhost:5002/todo', { params })
    .subscribe(response => {
      console.log(response);
      this.tasks = response;
    }, (error) => {
      // Handle errors
    });
  }

  getSchedule() {
    if(this.selectedDate != null) {
      this.scheduleService.getScheduleEventsForDate(this.selectedDate).subscribe((events) => {
        if(events != null) {
          this.schedule = [];
          events.forEach((e) => {
            e.startDisplayStr = new Date(e.start).toLocaleString();
            e.endDisplayStr = new Date(e.end).toLocaleString();
            this.schedule.push(e);
          });
        }
      })
    }
  }

  // Function to navigate to the previous month
  goToPreviousMonth() {
    this.currentDate.subtract(1, 'month');
    
  }

  // Function to navigate to the next month
  goToNextMonth() {
    this.currentDate.add(1, 'month');
  }
  
  // Function to generate the calendar grid
  generateCalendar() {
  
    const startDate = this.currentDate.clone().startOf('month');
    const endDate = this.currentDate.clone().endOf('month');
    const calendarDays: string[] = [];

    while (startDate.isSameOrBefore(endDate, 'day')) {
      calendarDays.push(startDate.format('YYYY-MM-DD'));
      startDate.add(1, 'day');
    }

    return calendarDays;
  }
}
