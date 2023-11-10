import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriaComponent } from './add-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('AddCategoriaComponent', () => {
  let component: AddCategoriaComponent;
  let fixture: ComponentFixture<AddCategoriaComponent>;
  class ActivatedRouteStub{
    params=of({/* */});
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriaComponent ],
      imports:[HttpClientTestingModule, FormsModule,ReactiveFormsModule,RouterTestingModule, MatSnackBarModule, MatFormFieldModule],
      providers:[Router, CategoriaService, HttpClient, {
        provide: ActivatedRoute,
        useValue: ""}]
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
