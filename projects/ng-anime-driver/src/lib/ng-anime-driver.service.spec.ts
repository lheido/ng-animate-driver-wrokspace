import { TestBed } from '@angular/core/testing';

import { NgAnimeDriver } from './ng-anime-driver.service';

describe('NgAnimeDriverService', () => {
  let service: NgAnimeDriver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAnimeDriver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
