import { TestBed } from '@angular/core/testing';

import { LaboralService } from './laboral.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('LaboralService', () => {
  let service: LaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaboralService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
