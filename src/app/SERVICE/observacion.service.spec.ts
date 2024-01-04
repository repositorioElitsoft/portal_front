import { TestBed } from '@angular/core/testing';

import { ObservacionService } from './observation.service';

describe('ObservacionService', () => {
  let service: ObservacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
