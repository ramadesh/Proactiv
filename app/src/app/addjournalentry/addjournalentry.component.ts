import { Component } from '@angular/core';
import { JournalEntry } from '../journal-entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from "../data.service";
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { switchMap } from 'rxjs';

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
  journals: JournalEntry[] = []

  constructor(private http: HttpClient, private profileService: ProfileService, public data: DataService, public router: Router) {}

   ngOnInit(): void {
    this.getProfileAndJournals();
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
  deleteEntry(title: any) {
    const params = new HttpParams().set('userId', this.profile.userId).set('title', title);
    this.http.delete('http://localhost:5002/JournalEntry', {params})
    .subscribe(response => {
      // console.log('response: ', response)
   });
   this.journals = this.journals.filter(obj =>  obj.title !== title);
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
