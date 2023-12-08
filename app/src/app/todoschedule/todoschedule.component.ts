import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todoschedule',
  templateUrl: './todoschedule.component.html',
  styleUrls: ['./todoschedule.component.css']
})
export class TodoscheduleComponent {
  public taskInput = '';
  public dueDate = '';
  public tasks: any = [];
  public userID = localStorage.getItem("username");
  add="addId2";

  constructor(private http: HttpClient) {

  }
  collapseToggle2(eventId: string) {
    var element = <HTMLElement> document.getElementById(eventId);
    if(element != null) {
      element.classList.toggle("active");
      var content = <HTMLElement> element.nextElementSibling;
      if(content != null) {
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      }
    }
  }
  
  addTask() {
    
    console.log("user: " + this.userID);
    console.log(this.taskInput);
    console.log(this.dueDate);
    this.http.post('http://localhost:5002/todo', { userId: this.userID, todo: this.taskInput, due: this.dueDate, active: 1 })
      .subscribe(response => {
        this.taskInput = '';
        this.dueDate = '';
        this.getTasks();
      }, (error) => {
      })
  }
  ngOnInit() {
    this.getTasks();
  }

  remove(task: any) {
    console.log(task._id);
    this.http.patch('http://localhost:5002/todo/' + task._id, {})
    .subscribe(response => {
      console.log(response);
      this.getTasks();
    }, (error) => {
      // Handle errors
    });
    
  }
  getTasks() {
    let params = new HttpParams().set('userId', this.userID!);
    this.http.get('http://localhost:5002/todo', { params })
    .subscribe(response => {
      this.taskInput = '';
      this.dueDate = '';
      console.log(response);
      this.tasks = response;
    }, (error) => {
      // Handle errors
    });
  }
}
