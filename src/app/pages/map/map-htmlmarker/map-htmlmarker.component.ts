import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-htmlmarker',
  templateUrl: './map-htmlmarker.component.html',
  styleUrls: ['./map-htmlmarker.component.css']
})
export class MapHTMLMarkerComponent {
  @Input() data;
}
