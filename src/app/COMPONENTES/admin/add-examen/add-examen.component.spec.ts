import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamenComponent } from './add-examen.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('AddExamenComponent', () => {
  let component: AddExamenComponent;
  let fixture: ComponentFixture<AddExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExamenComponent],
      imports: [HttpClientModule, FormsModule, MatDialogModule, HttpClientTestingModule], // Agrega HttpClientTestingModule
      providers: [CategoriaService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});