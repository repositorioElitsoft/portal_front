import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/service/login.service';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import {HttpClientModule} from '@angular/common/http';
import { of } from 'rxjs';

>>>>>>> feature/cristian

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
<<<<<<< HEAD
      providers: [LoginService],
      imports: [MatCardModule, HttpClientModule],
    }).compileComponents();
=======
      providers: [LoginService],  
      imports: [ MatCardModule,HttpClientModule],
    }).compileComponents();
    const myServiceObj = jasmine.createSpyObj('LoginService', [
      'selectType',
      'getData',
      
    ]);

    myServiceObj.getData
    .and
    .returnValue(of(true));
>>>>>>> feature/cristian

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