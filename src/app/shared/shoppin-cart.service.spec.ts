import { TestBed } from '@angular/core/testing';

import { ShoppinCartService } from './shoppin-cart.service';

describe('ShoppinCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppinCartService = TestBed.get(ShoppinCartService);
    expect(service).toBeTruthy();
  });
});
