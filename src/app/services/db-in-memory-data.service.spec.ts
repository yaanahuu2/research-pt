import { TestBed } from '@angular/core/testing';

import { DbInMemoryDataService } from './db-in-memory-data.service';

describe('DbInMemoryDataService', () => {
  let service: DbInMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbInMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
