import { TestBed } from '@angular/core/testing';

import { CargosUsuarioService } from './cargos-usuario.service';

describe('CargosUsuarioService', () => {
  let service: CargosUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
