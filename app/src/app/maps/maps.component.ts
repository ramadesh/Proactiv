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
    console.log("IM HEREEEEE" + this.searchbarInput);
  }
  libraries() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Libraries+near+me')
  }

  search() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=' + this.searchbarInput )
  }

  searchbarInput: string = '';
  staticmap() {
    //console.log('https://maps.googleapis.com/maps/api/staticmap?center=' + this.searchbarInput + '&zoom=13&size=600x300&key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g')
    //this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.googleapis.com/maps/api/staticmap?center=' + this.searchbarInput + '&zoom=13&size=600x300&key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g')

    //const staticLink = `mailto:?subject=Static Link from Proactiv&body=Hello, check this out: https://maps.googleapis.com/maps/api/staticmap?center=&zoom=13&size=600x300&key=YOUR_GOOGLE_MAPS_API_KEY`;
    //return staticLink;
    let t = this.searchbarInput.split(' ').join('+')

    const encodedURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/staticmap?center=${t}&zoom=13&size=600x300&key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g`);
    
    return`mailto:?subject=Look at this website&body=Hi, I found this website and thought you might like it: ${encodedURL}`;

  }

  //public searchbarInput = '';

  public staticmapInput = '';

  //public staticLink = 'mailto:?subject=look at this website&body=Hi,I found this website and thought you might like hi https://maps.googleapis.com/maps/api/staticmap?center=' + this.searchbarInput + '&zoom=13&size=600x300&key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g';


  weatherAPIKey = 'bef92f1fa030870057d2956f1544ee5d'
  city: any
  // state = 'IN';
  // countryCode = 'US';
  limit = 5
  temperature: any
  weatherDescription: any

  lat: any
  lng: any

  async ngOnInit() {
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
    
    // const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city},${this.state},${this.countryCode}&limit=${this.limit}&appid=${this.weatherAPIKey}`, {
    //     method: "GET"
    //   })

    // const geolocation = await data.json();
    // const lat = geolocation[0].lat
    // const lon = geolocation[0].lon

    // console.log(this.lat + " " + this.lng)

    // this.getCurrentWeather(this.lat, this.lng)

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