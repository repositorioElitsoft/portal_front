import { TestBed } from '@angular/core/testing';

import { CategoriaobservacionService } from './categoriaobservacion.service';

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
