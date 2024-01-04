import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileAdminComponent } from './profile-admin.component';
import { UserService } from 'src/app/service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

class ActivatedRouteStub {
  private subject = new BehaviorSubject(convertToParamMap({ id: 123 }));
  paramMap = this.subject.asObservable();
}

describe('ProfileAdminComponent', () => {
  let component: ProfileAdminComponent;
  let fixture: ComponentFixture<ProfileAdminComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ProfileAdminComponent],
      imports: [HttpClientModule],
      providers: [UserService, { provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
