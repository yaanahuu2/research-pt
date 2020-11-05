import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Define our base layers so we can reference them multiple times
  satMap = tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    detectRetina: true,
    attribution: '&copy; ESRI and Contributors'
  });

  // Marker for the top of Anahim Lake
  lake = marker([ 51.343253, -123.019383 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/TS-Map-Markers-House.png',
      iconRetinaUrl: 'assets/TS-Map-Markers-House.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  // Marker for Yunesitin
  yunesitin = marker([ 51.943253, -123.099383 ], {
    icon: icon({
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 41 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      iconRetinaUrl: 'assets/TS-Logo-Map-Marker.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  layersControl = {
    baseLayers: {
      'ESRI Satellite': this.satMap
    }
  };

  options = {
    layers: [
      this.satMap,
      this.yunesitin,
      this.lake
    ],
    zoom: 8,
    center: latLng([ 51.943253, -123.099383 ])
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log('clicked');
  }

}
