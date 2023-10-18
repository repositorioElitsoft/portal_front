import { TestBed } from '@angular/core/testing';

import { AcademicaService } from './academica.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('AcademicaService', () => {
  let service: AcademicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AcademicaService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AcademicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
