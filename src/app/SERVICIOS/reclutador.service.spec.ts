import { TestBed } from '@angular/core/testing';

import { ReclutadorService } from './reclutador.service';

describe('ReclutadorService', () => {
  let service: ReclutadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclutadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
