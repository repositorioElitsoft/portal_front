import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriaService,
        // No proporciones HttpClient aquí, dejar que HttpClientTestingModule lo maneje
        { provide: ActivatedRoute, useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
