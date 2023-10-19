import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterModuleTestingModule
import { RegistrarComponent } from './registrar.component';
import { MatCardModule } from '@angular/material/card';
import { FormGroup } from '@angular/forms';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,MatCardModule,FormGroup], // Agrega HttpClientTestingModule y RouterModuleTestingModule,

    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
