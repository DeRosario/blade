import { TestBed } from '@angular/core/testing';

import { ViewProductService } from './view-product.service';

describe('ViewProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewProductService = TestBed.get(ViewProductService);
    expect(service).toBeTruthy();
  });
});
