import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComponent } from './registrar.component';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule],
      providers:[UsuarioService, Router, NotificationService,HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
