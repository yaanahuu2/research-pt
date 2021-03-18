import { TestBed } from '@angular/core/testing';

import { DbHttpService } from './db-http.service';

describe('DbHttpService', () => {
  let service: DbHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
