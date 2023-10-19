import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamenModalComponent } from './examen-modal.component';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ExamenService } from 'src/app/service/examen.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

describe('ExamenModalComponent', () => {
  let component: ExamenModalComponent;
  let fixture: ComponentFixture<ExamenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenModalComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule, MatSnackBarModule, MatIconModule,MatFormFieldModule,MatSelectModule
      ],
      providers: [
        ChangeDetectorRef,
        CategoriaService,
        { provide: MatDialogRef, useValue: {} }, // Provide a dummy MatDialogRef
        FormBuilder,
        ExamenService
      ],
    });

    fixture = TestBed.createComponent(ExamenModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
