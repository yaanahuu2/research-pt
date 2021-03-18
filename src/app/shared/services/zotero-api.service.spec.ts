import { TestBed } from '@angular/core/testing';

import { ZoteroApiService } from './zotero-api.service';

describe('ZoteroApiService', () => {
  let service: ZoteroApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoteroApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
