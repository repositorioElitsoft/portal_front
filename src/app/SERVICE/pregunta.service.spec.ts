import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PreguntaService } from './pregunta.service';

describe('PreguntaService', () => {
  let service: PreguntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PreguntaService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PreguntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
