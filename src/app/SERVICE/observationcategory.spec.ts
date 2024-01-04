import { TestBed } from '@angular/core/testing';

import { CategoriaobservacionService } from './observationcategory';

describe('CategoriaobservacionService', () => {
  let service: CategoriaobservacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaobservacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
