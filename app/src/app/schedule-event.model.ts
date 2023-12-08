import * as moment from "moment";

export class ScheduleEvent {
    eventId : string = "";
    userId : string = "";
    title : string = "";
    details : string = "";
    start : string = "";
    end : string = "";
    conflictEvents : ScheduleEvent[] = [];
    startDisplayStr : string = "";
    endDisplayStr : string = "";
    constructor() {}
}
