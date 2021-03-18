import { Component, OnInit, ComponentFactoryResolver, ComponentRef, Injector, AfterViewChecked, DoCheck } from '@angular/core';
import { icon, latLng, marker, Marker, polyline, polygon, tileLayer } from 'leaflet';
import { MapHTMLMarkerComponent } from './map-htmlmarker/map-htmlmarker.component';
import { MapDataService } from '../../shared/services/mapdata.service';

interface MarkerMetaData {
  name: String;
  markerInstance: Marker;
  componentInstance: ComponentRef<MapHTMLMarkerComponent>
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewChecked, DoCheck {

  map;
  markers: MarkerMetaData[] = [];

  options = {
    layers: [
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        detectRetina: true,
        attribution: '&copy; ESRI and Contributors'
      })
    ],
    zoom: 8,
    center: latLng(51.943253, -123.099383)
  };

  constructor(private mapDataService: MapDataService, private resolver: ComponentFactoryResolver, private injector: Injector){}

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
  }

  addMarkerFromData() {
    // simply iterate over the array of markers from our data service
    // and add them to the map
    for(const entry of this.mapDataService.getMarkers()) {
      this.addMarkerToMap(entry);
    }
  }

  addMarkerToMap(markerData) {
    // dynamically instantiate a mapDataService
    const factory = this.resolver.resolveComponentFactory(MapHTMLMarkerComponent);

    // we need to pass in the dependency injector
    const component = factory.create(this.injector);

    // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
    component.instance.data = markerData;

    // we need to manually trigger change detection on our in-memory component
    // s.t. its template syncs with the data we passed in
    component.changeDetectorRef.detectChanges();


    // create a new Leaflet marker at the given position
    let m = marker(markerData.position, {
      icon: icon({
        iconSize: markerData.iconSize,
        iconAnchor: markerData.iconAnchor,
        iconUrl: markerData.iconUrl,
        iconRetinaUrl: markerData.iconUrl,
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });

    // pass in the HTML from our dynamic component
    const popupContent = component.location.nativeElement;

    // add popup functionality
    m.bindPopup(popupContent).openPopup();

    // finally add the marker to the map s.t. it is visible
    m.addTo(this.map);

    // add a metadata object into a local array which helps us
    // keep track of the instantiated markers for removing/disposing them later
    this.markers.push({
      name: markerData.name,
      markerInstance: m,
      componentInstance: component
    });
  }

  removeMarker(marker) {
    // remove it from the array meta objects
    const idx = this.markers.indexOf(marker);
    this.markers.splice(idx, 1);

    // remove the marker from the map
    marker.markerInstance.removeFrom(this.map);

    // destroy the component to avoid memory leaks
    marker.componentInstance.destroy();
  }

  // simulate some change which needs
  // to trigger updates on our dynamic components
  mutateMarkerData() {
    // this provocates changes which the components on the markers have to re-render
    this.mapDataService.changeMarkerData();
  }

  // This is a lifecycle method of an Angular component which gets invoked whenever for
  // our component change detection is triggered
  ngDoCheck() {
    // since our components are dynamic, we need to manually iterate over them and trigger
    // change detection on them.
    this.markers.forEach(entry => {
      entry.componentInstance.changeDetectorRef.detectChanges();
    })
  }

  ngAfterViewChecked(): void {
    this.addMarkerFromData();
  }

  onClick() {
    console.log('clicked');
  }

}
