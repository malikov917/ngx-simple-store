import { TestBed, inject } from '@angular/core/testing';

import { NgxSimpleStoreService } from './ngx-simple-store.service';

describe('NgxSimpleStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSimpleStoreService]
    });
  });

  it('should be created', inject([NgxSimpleStoreService], (service: NgxSimpleStoreService) => {
    expect(service).toBeTruthy();
  }));
});
