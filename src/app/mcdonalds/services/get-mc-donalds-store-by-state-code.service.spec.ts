import { TestBed, inject } from '@angular/core/testing';

import { GetMcDonaldsStoreByStateCodeService } from './get-mc-donalds-store-by-state-code.service';

describe('GetMcDonaldsStoreByStateCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMcDonaldsStoreByStateCodeService]
    });
  });

  it('should be created', inject([GetMcDonaldsStoreByStateCodeService], (service: GetMcDonaldsStoreByStateCodeService) => {
    expect(service).toBeTruthy();
  }));
});
