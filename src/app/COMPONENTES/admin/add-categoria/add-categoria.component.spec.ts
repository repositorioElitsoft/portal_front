import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriaComponent } from './add-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddCategoriaComponent', () => {
  let component: AddCategoriaComponent;
  let fixture: ComponentFixture<AddCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriaComponent ],
      imports:[HttpClientTestingModule, FormsModule,ReactiveFormsModule],
      providers:[Router, CategoriaService, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
