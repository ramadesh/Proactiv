import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent {
  // Define the data for your calendar, e.g., tasks for each day.
  public currentDate = moment(); // Initialize with the current date

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
  goToPreviousMonth() {
    this.currentDate.subtract(1, 'month');
    // Update the calendar based on the new this.currentDate
  }

  // Function to navigate to the next month
  goToNextMonth() {
    this.currentDate.add(1, 'month');
    // Update the calendar based on the new this.currentDate
  }

  generateCalendar() {
    // Generate your calendar logic here. You can use moment.js for date manipulation.

    // Example logic for generating a calendar grid for the current month
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
