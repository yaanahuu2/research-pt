import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleFormComponent } from './subtitle-form.component';

describe('SubtitleFormComponent', () => {
  let component: SubtitleFormComponent;
  let fixture: ComponentFixture<SubtitleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
