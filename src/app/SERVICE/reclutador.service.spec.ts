import { TestBed } from '@angular/core/testing';

import { ReclutadorService } from './reclutador.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('ReclutadorService', () => {
  let service:  ReclutadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReclutadorService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject( ReclutadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
