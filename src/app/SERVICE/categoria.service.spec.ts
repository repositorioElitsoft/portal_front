import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriaService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
