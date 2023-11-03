import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { ScheduleEvent } from '../schedule-event.model';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  events: ScheduleEvent[] = [];
  selectedEvent?: ScheduleEvent;
  title = "";
  details = "";
  startDate = moment.now.toString();
  endDate = moment.now.toString();

  constructor(private scheduleService : ScheduleService) { }

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule() {
    this.scheduleService.getAllScheduleEvents().subscribe((events) => {
      this.events = events;
    })
  }

  addEvent() {
    let newEvent = new ScheduleEvent();
    newEvent.title = this.title;
    newEvent.details = this.details;
    newEvent.start = this.startDate;
    newEvent.end = this.endDate;

    this.scheduleService.createScheduleEvent(newEvent).subscribe((ev) => {
        console.log(this.events.length);
        console.log(ev);
        newEvent.eventId = ev.eventId;
        this.events.push(newEvent);
    })
  }

  onSelect(myEvent: ScheduleEvent): void {
    this.selectedEvent = myEvent;
  }
}
