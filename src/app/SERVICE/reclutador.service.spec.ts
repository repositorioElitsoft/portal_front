import { TestBed } from '@angular/core/testing';

import { ReclutadorService } from './reclutador.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReclutadorService', () => {
  let service: ReclutadorService;

  beforeEach(async() => {
    
    await TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[HttpClient],


    });
    service = TestBed.inject(ReclutadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
