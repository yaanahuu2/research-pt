import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoteroDialogContComponent } from './zotero-dialog-cont.component';

describe('ZoteroDialogContComponent', () => {
  let component: ZoteroDialogContComponent;
  let fixture: ComponentFixture<ZoteroDialogContComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoteroDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoteroDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
