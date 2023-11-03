import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent {

  constructor(public http: HttpClient) {

  }
  // Define the data for your calendar, e.g., tasks for each day.
  public currentDate = moment(); // Initialize with the current date
  public userID = localStorage.getItem("username");
  public tasks: any = [];

  selectedDate: string | null = null;


  // Function to show tasks for a specific date
  showTasksForDate(dateKey: string) {
    this.selectedDate = dateKey;
    this.getTasks();
    
  }

  // Function to generate the calendar grid
  goToPreviousMonth() {
    this.currentDate.subtract(1, 'month');
    
  }

  // Function to navigate to the next month
  goToNextMonth() {
    this.currentDate.add(1, 'month');
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
