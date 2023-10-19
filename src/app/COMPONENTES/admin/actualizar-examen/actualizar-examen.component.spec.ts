import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarExamenComponent } from './actualizar-examen.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExamenService } from 'src/app/service/examen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';


describe('ActualizarExamenComponent', () => {
  let component: ActualizarExamenComponent;
  let fixture: ComponentFixture<ActualizarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarExamenComponent],
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        ExamenService,
        Router,
        CategoriaService
        
      ]
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