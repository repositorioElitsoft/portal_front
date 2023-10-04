import { TestBed } from '@angular/core/testing';

import { ValidarMailService } from './validar-mail.service';

describe('ValidarMailService', () => {
  let service: ValidarMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
