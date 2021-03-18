import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LookbookComponent } from './lookbook.component';

describe('LookbookComponent', () => {
  let component: LookbookComponent;
  let fixture: ComponentFixture<LookbookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
