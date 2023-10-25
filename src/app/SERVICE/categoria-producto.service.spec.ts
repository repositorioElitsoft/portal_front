import { TestBed } from '@angular/core/testing';

import { CategoriaProductoService } from './categoria-producto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute } from '@angular/router';

describe('CategoriaProductoService', () => {
  let service: CategoriaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriaProductoService,
        { provide: ActivatedRoute , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
