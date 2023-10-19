import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExamenPreguntasComponent } from './view-examen-preguntas.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';




describe('ViewExamenPreguntasComponent', () => {
  let component: ViewExamenPreguntasComponent;
  let fixture: ComponentFixture<ViewExamenPreguntasComponent>;

  beforeEach(async () => {
    // Crea un objeto simulado de ActivatedRoute
    const activatedRouteStub = {
      paramMap: of({ get: (key: string) => 'some-value' }), // Simula los parámetros de la ruta
    };

    await TestBed.configureTestingModule({
      declarations: [ViewExamenPreguntasComponent],
      imports:[HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub  },
        // Puedes proporcionar otros servicios necesarios, como Router
      ],

      
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExamenPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
