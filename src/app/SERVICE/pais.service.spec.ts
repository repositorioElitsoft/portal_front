import { TestBed } from '@angular/core/testing';
import { PaisService } from './pais.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


describe('PaisService', () => {
  let service: PaisService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaisService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject( PaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
