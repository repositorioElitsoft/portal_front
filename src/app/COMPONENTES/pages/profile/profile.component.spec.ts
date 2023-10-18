import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/service/login.service';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [LoginService],
      imports: [MatCardModule, HttpClientModule],
    }).compileComponents();

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    const myServiceObj = jasmine.createSpyObj('LoginService', [
      'selectType',
      'getData',
    ]);
  });

  it('should create', () => {
    // Ahora puedes realizar la afirmación
    expect(component).toBeTruthy();
  });
});
