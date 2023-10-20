import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamenComponent } from './add-examen.component';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ExamenService } from 'src/app/service/examen.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AddExamenComponent', () => {
  let component: AddExamenComponent;
  let fixture: ComponentFixture<AddExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamenComponent ],
      imports:[HttpClientTestingModule, FormsModule],
      providers:[CategoriaService,ExamenService, Router, HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
