import { Component, ChangeDetectorRef } from '@angular/core';
import { JournalEntry } from '../journal-entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { switchMap } from 'rxjs';
import { JournalPrompt } from '../journal-prompt';


@Component({
  selector: 'app-addjournalentry',
  templateUrl: './addjournalentry.component.html',
  styleUrls: ['./addjournalentry.component.css']
})
export class AddjournalentryComponent {
  JournalEntry : JournalEntry = {
    title: '',
    content : ''
  };
  profile : Profile = {
    displayName: '',
    userId : '',
    pass : '',
    email : '',
    birthday : '',
    secQ: ''
  };
  JournalPrompt : JournalPrompt = {
    prompt: ''
  };
  
  journals: JournalEntry[] = []

  constructor(private http: HttpClient, private profileService: ProfileService, public data: DataService, public router: Router, private cd: ChangeDetectorRef) {}

   ngOnInit(): void {
    this.getProfileAndJournals();
    this.getPrompt();
  }

  getProfileAndJournals() {
    this.profileService.getProfile()
    .pipe(
      switchMap((profile) => {
        this.profile = profile;
        const params = new HttpParams().set('userId', this.profile.userId);
        return this.http.get('http://localhost:5002/JournalEntry', { params });
      })
    )
    .subscribe((response) => {
      // console.log('response journals: ', response);
      this.journals = Object.values(response)
    });
  }

  getPrompt() {
    this.http.get('http://localhost:5002/JournalPrompt')
    .subscribe(response => {
      //console.log(Object(response)["prompt"]);
      this.JournalEntry.title = Object(response)["prompt"]
   });
  }
  deleteEntry(title: any) {
    const params = new HttpParams().set('userId', this.profile.userId).set('title', title);
    this.http.delete('http://localhost:5002/JournalEntry', {params})
    .subscribe(response => {
      // console.log('response: ', response)
   });
   this.journals = this.journals.filter(obj =>  obj.title !== title);
  }
  editEntry(title: any) {
    const update = this.journals.find(i => i.title === title);
    this.JournalEntry.title = update?.title!;
    this.JournalEntry.content = update?.content!;

  }

  updateEntry() {
    this.http.put('http://localhost:5002/JournalEntry', { userId: this.profile.userId, title: this.JournalEntry.title, content: this.JournalEntry.content})
    .subscribe(response => {
      //console.log('response: ', response)
      const update = this.journals.find(i => i.title === this.JournalEntry.title);
      update!.content = this.JournalEntry.content!;
      this.JournalEntry.title = '';
      this.JournalEntry.content = '';/* 
      const temp:JournalEntry  = this.journals.pop()!;
      this.cd.detectChanges();
      this.journals.push(temp);
      this.cd.detectChanges();
      this.cd.detectChanges(); */
   });
  }
  

   saveEntry() {
    //console.log("trying to saveeeee");
    //console.log(this.profile);
    //console.log("USER ABOVEEEEE");
    this.http.post('http://localhost:5002/JournalEntry', { userId: this.profile.userId, title: this.JournalEntry.title, content: this.JournalEntry.content})
    .subscribe(response => {
      //console.log('response: ', response)
      const j = {
        title: this.JournalEntry.title,
        content : this.JournalEntry.content
      };
      this.journals = this.journals.concat(j)
      

      this.JournalEntry.title = '';
      this.JournalEntry.content = '';
      
   });
  }
}
