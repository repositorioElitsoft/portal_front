import { TestBed } from '@angular/core/testing';

import { CargosElitsoftService } from './cargos-elitsoft.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CargosElitsoftService', () => {
  let service: CargosElitsoftService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CargosElitsoftService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CargosElitsoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
