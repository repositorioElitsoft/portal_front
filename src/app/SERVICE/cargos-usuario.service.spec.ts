import { TestBed } from '@angular/core/testing';
import { CargosUsuarioService } from './cargos-usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CargosUsuarioService', () => {
  let service: CargosUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CargosUsuarioService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CargosUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
