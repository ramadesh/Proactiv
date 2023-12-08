import { HttpClient, HttpParams } from '@angular/common/http';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DataService } from '../data.service';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { CommonModule } from '@angular/common';

/**
 * @title Card with sub-title
 */
@Component({
  selector: 'app-dashcontent',
  templateUrl: './dashcontent.component.html',
  styleUrls: ['./dashcontent.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class PastjournalsComponent {
  public userID = localStorage.getItem("username");
  public journals: any = [];
  public tasks: any = [];
  public spotifyProfilePic = this.data.spotifyProfilePic;
  
  weatherAPIKey = 'bef92f1fa030870057d2956f1544ee5d'
  city: any
  limit = 5
  temperature: any
  weatherDescription: any
  lat: any
  lng: any

  profile : Profile = {
    displayName: '',
    userId : '',
    pass : '',
    email : '',
    birthday : '',
    secQ: ''
  };

  constructor(private http: HttpClient, public data: DataService, private profileService: ProfileService) {
    this.getJournals();
    this.getProfile();
    this.getTasks();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude +
          //   "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
          this.getCurrentWeather(this.lat, this.lng)
        }
      },
        (error: GeolocationPositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  
  getJournals() {
    let params = new HttpParams().set('userId', this.userID!);
    this.http.get('http://localhost:5002/dashjournals', { params })
    .subscribe(response => {
      console.log(response);
      this.journals = response;
    }, (error) => {
      // Handle errors
    });
  }
  getProfile() {
    this.profileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    })
  }
  getTasks() {
    let params = new HttpParams().set('userId', this.userID!);
    this.http.get('http://localhost:5002/todo', { params })
    .subscribe(response => {
      console.log(response);
      this.tasks = response;
    }, (error) => {
      // Handle errors
    });
  }
  async getCurrentWeather(lat: number, lon: number) {
    const geocoding = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${this.limit}&appid=${this.weatherAPIKey}`)

    const body = await geocoding.json()
    this.city = body[0].name

    // console.log(body)

    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.weatherAPIKey}&units=imperial`)

    const currentWeather = await data.json()
    this.temperature = currentWeather.main.temp
    this.weatherDescription = currentWeather.weather[0].description

    console.log(currentWeather.weather)
  }


}
