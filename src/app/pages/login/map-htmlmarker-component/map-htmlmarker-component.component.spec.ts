import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHTMLMarkerComponentComponent } from './map-htmlmarker-component.component';

describe('MapHTMLMarkerComponentComponent', () => {
  let component: MapHTMLMarkerComponentComponent;
  let fixture: ComponentFixture<MapHTMLMarkerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHTMLMarkerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHTMLMarkerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
