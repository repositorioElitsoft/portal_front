import { TestBed } from '@angular/core/testing';

import { CargosElitsoftService } from './cargos-elitsoft.service';

describe('CargosElitsoftService', () => {
  let service: CargosElitsoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosElitsoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
