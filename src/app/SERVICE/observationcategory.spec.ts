import { TestBed } from '@angular/core/testing';

import { observationCategoryService } from './observationcategory';

describe('observationCategoryService', () => {
  let service: observationCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(observationCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
