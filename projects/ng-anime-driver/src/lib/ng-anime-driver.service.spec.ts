import { TestBed } from '@angular/core/testing';

import { NgAnimeDriverService } from './ng-anime-driver.service';

describe('NgAnimeDriverService', () => {
  let service: NgAnimeDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAnimeDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
