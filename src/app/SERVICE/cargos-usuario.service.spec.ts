import { TestBed } from '@angular/core/testing';
import { UserJobService} from './cargos-user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('UserJobService', () => {
  let service: UserJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserJobService,
        { provide: ActivatedRoute,HttpClient , useValue: {} }, // Mock ActivatedRoute
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
