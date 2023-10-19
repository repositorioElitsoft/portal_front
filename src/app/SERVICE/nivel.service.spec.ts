import { TestBed } from '@angular/core/testing';

import { NivelService } from './nivel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('NivelService', () => {
  let service: NivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NivelService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
