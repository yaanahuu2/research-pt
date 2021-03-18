import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoteroComponent } from './zotero.component';

describe('ZoteroComponent', () => {
  let component: ZoteroComponent;
  let fixture: ComponentFixture<ZoteroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoteroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
