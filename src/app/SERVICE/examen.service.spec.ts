import { TestBed } from '@angular/core/testing';

import { ExamenService } from './examen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('ExamenService', () => {
  let service: ExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExamenService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
