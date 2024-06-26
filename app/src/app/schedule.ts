export interface Schedule {
    eventId : string;
    userId : string;
    title : string;
    details : string;
    start : string;
    end : string;
    conflictEvents : Schedule[];
    startDisplayStr : string;
    endDisplayStr: string;
}