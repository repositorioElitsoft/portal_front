import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileRComponent } from './profile-r.component';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('ProfileRComponent', () => {
  let component: ProfileRComponent;
  let fixture: ComponentFixture<ProfileRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileRComponent],
      imports: [HttpClientModule,RouterTestingModule,MatCardModule,ReactiveFormsModule,MatIconModule], // Agrega HttpClientModule
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
