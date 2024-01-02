import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdvertenciaEliminarComponent } from './advertencia-eliminar.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

// Importa el módulo de diálogo (assumiendo que se llama DialogTestModule)
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar el módulo de diálogo adecuado

describe('AdvertenciaEliminarComponent', () => {
  let component: AdvertenciaEliminarComponent;
  let fixture: ComponentFixture<AdvertenciaEliminarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AdvertenciaEliminarComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatDividerModule,
        MatCheckboxModule,
        FormsModule,
        MatDialogModule, // Agrega el módulo de diálogo
      ],
      providers: [
        ChangeDetectorRef,
        CategoriaService
      ]
    });

    fixture = TestBed.createComponent(AdvertenciaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
