import { TestBed } from '@angular/core/testing';

import { EmailRService } from './email-r.service';

describe('EmailRService', () => {
  let service: EmailRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
