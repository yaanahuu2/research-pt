import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHTMLMarkerComponent } from './map-htmlmarker.component';

describe('MapHTMLMarkerComponent', () => {
  let component: MapHTMLMarkerComponent;
  let fixture: ComponentFixture<MapHTMLMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHTMLMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHTMLMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
