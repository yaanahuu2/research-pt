import { TestBed } from '@angular/core/testing';

import { LookbookSelectionsService } from './lookbook-selections.service';

describe('LookbookSelectionsService', () => {
  let service: LookbookSelectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookbookSelectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
