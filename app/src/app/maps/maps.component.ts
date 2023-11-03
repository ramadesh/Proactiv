import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  query: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')
  constructor(private sanitizer: DomSanitizer) {
  }
  coffee() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')

  }
  libraries() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Libraries+near+me')
  }

  weatherAPIKey = 'bef92f1fa030870057d2956f1544ee5d'
  city = 'West Lafayette';
  state = 'IN';
  countryCode = 'US';
  limit = 5
  temperature: any
  weatherDescription: any

  async ngOnInit() {
    
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city},${this.state},${this.countryCode}&limit=${this.limit}&appid=${this.weatherAPIKey}`, {
        method: "GET"
      })

    const geolocation = await data.json();
    const lat = geolocation[0].lat
    const lon = geolocation[0].lon

    console.log(lat + " " + lon)

    this.getCurrentWeather(lat, lon)

  }

  async getCurrentWeather(lat: number, lon: number) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.weatherAPIKey}&units=imperial`)

    const currentWeather = await data.json()
    this.temperature = currentWeather.main.temp
    this.weatherDescription = currentWeather.weather[0].description

    console.log(currentWeather.weather)
  }

  
}