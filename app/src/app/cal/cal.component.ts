import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent {
  // Define the data for your calendar, e.g., tasks for each day.
  public tasksData: Record<string, string[]> = {
    '2023-11-01': ['Task 1', 'Task 2'],
    '2023-11-15': ['Task 3'],
    '2023-11-30': ['Task 4', 'Task 5'],
    // Add more data as needed...
  };

  selectedDate: string | null = null;

  // Function to show tasks for a specific date
  showTasksForDate(dateKey: string) {
    this.selectedDate = dateKey;
    console.log(dateKey);
    const dateKeys = Object.keys(this.tasksData);
    dateKeys.forEach(date => {
      if (date == dateKey) {
        console.log("found match: " + this.tasksData[date]);
      }
      // Here, dateKey is the date, and tasks is an array of tasks for that date.
    });
    
  }

  // Function to generate the calendar grid
  generateCalendar() {
    // Generate your calendar logic here. You can use moment.js for date manipulation.

    // Example logic for generating a calendar grid using moment.js
    const currentDate = moment('2023-11-01', 'YYYY-MM-DD');
    const endDate = moment('2023-11-30', 'YYYY-MM-DD');
    const calendarDays: string[] = [];

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      calendarDays.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }

    return calendarDays;
  }
}
