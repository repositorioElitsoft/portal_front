import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('LoginService ', () => {
  let service: LoginService ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
=======

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
>>>>>>> feature/cristian
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
