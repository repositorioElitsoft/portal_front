import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/service/login.service';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { of } from 'rxjs';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
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

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Ahora puedes realizar la afirmación
    expect(component).toBeTruthy();
  });
});