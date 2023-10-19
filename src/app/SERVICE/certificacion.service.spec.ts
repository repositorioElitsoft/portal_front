import { TestBed } from '@angular/core/testing';
import { CertificacionService } from './certificacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CertificacionService', () => {
  let service: CertificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CertificacionService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CertificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
