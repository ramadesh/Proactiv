<<<<<<< HEAD
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
=======
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

>>>>>>> be97c6d426d985e73d364cd29d6b9fbb7ed6a3ce

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent {
<<<<<<< HEAD
  @Output() notify = new EventEmitter();

  private map?: H.Map;
  private platform?: H.service.Platform;
  
  constructor() {
    this.zoom = 2;
    this.lat = 0;
    this.lng = 0;
    this.address = "";
  }

  @Input() zoom = 2;
  @Input() lat: number;
  @Input() lng: number;
  address: string;

  @ViewChild('map') mapDiv?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // Instantiate a platform, default layers and a map as usual.
      this.platform = new H.service.Platform({
        apikey: 'Gp22nP47_8DVr0x_MirjZ1j_17DO750FyVbz7lQNJic'
      });
      const layers = this.platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        // Add type assertion to the layers object... 
        // ...to avoid any Type errors during compilation.
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: 0, lng: 0},
          zoom: 2,
        },
      );

      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });

      map.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev);
      });
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      this.map = map;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map) {
      if (changes['zoom'] !== undefined) {
        this.map.setZoom(changes['zoom'].currentValue);
      }
      if (changes['lat'] !== undefined) {
        this.map.setCenter({lat: changes['lat'].currentValue, lng: this.lng});
      }
      if (changes['lng'] !== undefined) {
        this.map.setCenter({lat: this.lat, lng: changes['lng'].currentValue});
      }
    }
  }

  search() {
    if(this.map) {
      this.map.setZoom(this.zoom);
      this.map.setCenter({lat: this.lat, lng: this.lng});
    }
  }

  searchAddress() {
    console.log("address: " + this.address);
    if(this.platform) {
      console.log(this.address);
      // Get an instance of the search service:
      var service = this.platform.getSearchService();

      // Call the geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.geocode({
        q: this.address
      }, (result:any) => {
        console.log("lat: " + result.items[0].position.lat);
        // Add a marker for each location found
        this.lat = result.items[0].position.lat;
        this.lng = result.items[0].position.lng;
        if(this.map) {
          this.map.setCenter({lat: result.items[0].position.lat, lng: result.items[0].position.lng});
          this.map.addObject(new H.map.Marker(result.items[0].position));
        }
      }, alert);
    }
  }
=======
  query: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')
  constructor(private sanitizer: DomSanitizer) {
  }
  coffee() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Coffee+near+me')

  }
  libraries() {
    this.query = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/search?key=AIzaSyADNbpFpQH0hSdd8RH5p-cLWSzkpX6Y-0g&q=Libraries+near+me')
  }
  

>>>>>>> be97c6d426d985e73d364cd29d6b9fbb7ed6a3ce
}