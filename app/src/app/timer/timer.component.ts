import { Component } from '@angular/core';
import { min, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  public isRunning: boolean = false;
  public startText = 'Start';
  public time: any;
  public hours: any;
  public minutes: any;
  public seconds: any;

  ngOnInit(): void {
    this.time = 0;
    this.hours = "00";
    this.minutes = "00";
    this.seconds = "00";
  }

 toggleTimer() {
    this.isRunning = !this.isRunning;
    this.time = this.hours * 3600 + this.minutes * 60 + this.seconds * 1;
    this.startTimer();
  }

  startTimer() {
    const subscription = timer(0, 1000).subscribe(elapsedCycles => {
    if(this.isRunning && this.time != 0) {
        this.time--;
        this.getDisplayTimer(this.time);
        this.startText = 'Stop';
      } else {
        this.startText = 'Start';
        subscription.unsubscribe();
        if(this.time == 0) {
          this.timerEnd();
        }
      }
    });
  }
  
  getDisplayTimer(time: number) {
    var hours = '' + Math.floor(time / 3600);
    var minutes = '' + Math.floor(time % 3600 / 60);
    var seconds = '' + Math.floor(time % 3600 % 60);

    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  timerEnd() {
    var snd = new Audio("assets/alarm-clock-short.mp3");
    snd.play();
    setTimeout(function(){alert("Time's Up!")},10);
  }
}
