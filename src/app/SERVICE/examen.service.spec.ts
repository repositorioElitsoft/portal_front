import { TestBed } from '@angular/core/testing';
import { ExamenService } from './examen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExamenService', () => {
  let service: ExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamenService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
