import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapHTMLMarkerComponent } from './map-htmlmarker.component';

describe('MapHTMLMarkerComponent', () => {
  let component: MapHTMLMarkerComponent;
  let fixture: ComponentFixture<MapHTMLMarkerComponent>;

  beforeEach(waitForAsync(() => {
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
