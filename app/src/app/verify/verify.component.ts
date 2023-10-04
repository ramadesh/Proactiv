import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  userVerify: string;
  tokenVerify: string;
  subscription: Subscription = new Subscription;
  public tokenInput = "";

  constructor(private http: HttpClient, public data: DataService, public router: Router) { 
    this.userVerify = data.user;
    this.tokenVerify = data.token;

  }

  //console.log(userVerify);

  ngOnInit() {
    console.log(this.userVerify);
    console.log(this.tokenVerify);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  verify() {
    console.log(this.userVerify);
    if (this.userVerify != null && this.tokenVerify == this.tokenInput)
    {
      alert("token accepted");
      this.router.navigate(["/dash"]);
    } else {
      alert("invalid token or token mismatch");
    }
  }
  
}
