import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialTreeComponent } from './material-tree.component';

describe('MaterialTreeComponent', () => {
  let component: MaterialTreeComponent;
  let fixture: ComponentFixture<MaterialTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
