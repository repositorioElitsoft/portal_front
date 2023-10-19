import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarExamenComponent } from './actualizar-examen.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExamenService } from 'src/app/service/examen.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActualizarExamenComponent', () => {
  let component: ActualizarExamenComponent;
  let fixture: ComponentFixture<ActualizarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarExamenComponent ],
      imports:[MatCardModule,HttpClientTestingModule,RouterModule],
      providers:[ActivatedRoute, ExamenService, CategoriaService, Router],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
