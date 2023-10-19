import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoriaComponent } from './add-categoria.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Agrega esta importación
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCategoriaComponent', () => {
  let component: AddCategoriaComponent;
  let fixture: ComponentFixture<AddCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriaComponent ],
      imports: [MatCardModule, MatFormFieldModule, HttpClientTestingModule, FormsModule,MatInputModule,BrowserAnimationsModule], // Agrega FormsModule
      providers: [CategoriaService, MatSnackBar, Router],
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