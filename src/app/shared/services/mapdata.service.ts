import { Injectable } from '@angular/core';
import { LatLngExpression} from 'leaflet';

export class Marker {
  id: number;
  name: string;
  iconSize: any;
  iconAnchor: any;
  iconUrl: string;
  description: string;
  position: LatLngExpression
}

@Injectable()
export class MapDataService {
  markers: Marker[] = [
    {
      id: 1,
      name: 'Xeni',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 52.481670, -125.333747 ]
    },
    {
      id: 2,
      name: 'Yunesit\'in',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 51.926724, -123.141265 ]
    },
    {
      id: 3,
      name: 'Tl\'esqox',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 51.9684142,-122.5384978 ]
    },
    {
      id: 4,
      name: 'Tl\'etinqox',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 52.0829852,-123.2867468 ]
    },
    {
      id: 5,
      name: 'Tsi Del Del',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 52.1246642,-123.6898018 ]
    },
    {
      id: 6,
      name: 'ʔEsdilagh',
      iconSize: [ 50, 82 ],
      iconAnchor: [ 25, 0 ],
      iconUrl: 'assets/TS-Logo-Map-Marker.png',
      description: 'Tsilhqot\'in Community',
      position: [ 52.8567206,-122.6299226 ]
    },
    {
      id: 7,
      name: 'Obsidian',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Obsidian.png',
      description: 'Place where people mined obsidian for tools',
      position: [ 52.026988, -124.089927 ]
    },
    {
      id: 8,
      name: 'Deer',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Deer.png',
      description: 'Deer hunting spot',
      position: [ 52.497060, -124.323208 ]
    },
    {
      id: 9,
      name: 'Elk',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Elk.png',
      description: 'Elk hunting spot',
      position: [ 52.529118, -123.149843 ]
    },
    {
      id: 10,
      name: 'Weaving',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Weaving.png',
      description: 'Basket Weavers',
      position: [ 52.074537, -123.284082 ]
    },
    {
      id: 11,
      name: 'Weaving',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Weaving.png',
      description: 'Basket Weavers',
      position: [ 51.942631, -123.101158 ]
    },
    {
      id: 12,
      name: 'Weaving',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-Weaving.png',
      description: 'Basket Weavers',
      position: [ 52.312477, -122.304532 ]
    },
    {
      id: 13,
      name: 'Village',
      iconSize: [ 25, 41 ],
      iconAnchor: [ 12, 0 ],
      iconUrl: 'assets/TS-Map-Markers-House.png',
      description: 'Ancient village site',
      position: [ 52.312477, -122.904532 ]
    }
];

  getMarkers() {
    return this.markers;
  }

  getMarkerById(id) {
    return this.markers.filter((entry) => entry.id === id)[0];
  }

  changeMarkerData() {
    for(let marker of this.markers) {
      // just add a random number at the end
      marker.description = `Some random value ${Math.random() * 100}`;
    }
  }

}
