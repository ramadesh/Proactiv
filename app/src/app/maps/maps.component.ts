import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent {
  query: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')
  constructor(private sanitizer: DomSanitizer) {
  }
  coffee() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')

  }
  libraries() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Libraries+near+me')
  }
  
}