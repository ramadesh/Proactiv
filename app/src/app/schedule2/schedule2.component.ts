import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { ScheduleEvent } from '../schedule-event.model';
import { Schedule } from '../schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule2',
  templateUrl: './schedule2.component.html',
  styleUrls: ['./schedule2.component.css']
})
export class Schedule2Component implements OnInit {
  events: Schedule[] = [];
  conflicts: Schedule[] = [];
  selectedEvent?: Schedule;
  title = "";
  details = "";
  startDate = "";
  endDate = "";

  constructor(private scheduleService : ScheduleService) { }

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule() {
    this.scheduleService.getAllScheduleEvents().subscribe((data) => {
      if(data != null) {
        this.events.length = 0;
        data.forEach((e) => {
          this.events.push(e);
        });
      }
    })
  }

  addEvent() {
    let newEvent = new ScheduleEvent();
    newEvent.title = this.title;
    newEvent.details = this.details;
    newEvent.start = this.startDate;
    newEvent.end = this.endDate;

    console.log(this.events);

    this.scheduleService.createScheduleEvent(newEvent).subscribe((e) => {
        console.log(e);
        newEvent.eventId = e.eventId;
        this.events.push(newEvent);
    })
  }

  saveEvent() {
    if(this.selectedEvent != null) {
      this.scheduleService.updateScheduleEvent(this.selectedEvent).subscribe((e) => {
        if(e != null) {
          console.log(e);
          alert("Successfully saved schedule event.");
        } else {
          alert("Failed to edit schedule event.");
        }
      })
    }
  }

  deleteEvent() {
    if(this.selectedEvent != null) {
      this.scheduleService.deleteScheduleEvent(this.selectedEvent.eventId).subscribe((e) => {
        if(e) {
          this.getSchedule();
          this.selectedEvent = undefined;
          alert("Successfully deleted schedule event.");
        } else {
          alert("Failed to delete schedule event.");
        }
      })
    }
  }

  onSelect(myEvent: ScheduleEvent): void {
    this.selectedEvent = myEvent;
    this.scheduleService.getScheduleConflictsForEvent(myEvent.eventId).subscribe((data) => {
      if(data != null) {
        this.conflicts.length = 0;
        data.forEach((e) => {
          this.conflicts.push(e);
        });
      }
    })
  }
}
