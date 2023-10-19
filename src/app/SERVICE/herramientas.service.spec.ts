import { TestBed } from '@angular/core/testing';

import { HerramientasService } from './herramientas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('HerramientasService', () => {
  let service: HerramientasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HerramientasService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HerramientasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
