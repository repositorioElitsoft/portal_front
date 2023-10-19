import { TestBed } from '@angular/core/testing';

import { ValidarMailService } from './validar-mail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('ValidarMailService ', () => {
  let service:  ValidarMailService ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidarMailService ,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject( ValidarMailService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
