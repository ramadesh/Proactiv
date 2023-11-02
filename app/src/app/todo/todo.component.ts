import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public taskInput = '';
  public dueDate = '';
  public tasks: any = [];
  public userID = localStorage.getItem("username");
  constructor(private http: HttpClient) {

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
