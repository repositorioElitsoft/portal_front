import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IniciarSesionComponent],
      imports: [HttpClientModule,RouterTestingModule,MatCardModule,ReactiveFormsModule], // Agrega HttpClientModule
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
