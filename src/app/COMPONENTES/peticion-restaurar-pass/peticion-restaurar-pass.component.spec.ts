import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeticionRestaurarPassComponent } from './peticion-restaurar-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('PeticionRestaurarPassComponent', () => {
  let component: PeticionRestaurarPassComponent;
  let fixture: ComponentFixture<PeticionRestaurarPassComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeticionRestaurarPassComponent],
      providers: [FormBuilder, Router, NotificationService, UsuarioService],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule], 
    }).compileComponents();
  
    fixture = TestBed.createComponent(PeticionRestaurarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  



});


