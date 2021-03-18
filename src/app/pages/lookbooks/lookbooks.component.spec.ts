import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LookbooksComponent } from './lookbooks.component';

describe('LookbooksComponent', () => {
  let component: LookbooksComponent;
  let fixture: ComponentFixture<LookbooksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
