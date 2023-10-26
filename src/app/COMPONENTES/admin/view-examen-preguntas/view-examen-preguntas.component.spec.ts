import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExamenPreguntasComponent } from './view-examen-preguntas.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreguntaService } from 'src/app/service/pregunta.service';




describe('ViewExamenPreguntasComponent', () => {
  let component: ViewExamenPreguntasComponent;
  let fixture: ComponentFixture<ViewExamenPreguntasComponent>;


  beforeEach(async () => {

    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get:() => {
            return 'exam_id';
          },
        },
      },
    };

    let mockPreguntaService = jasmine.createSpyObj(['listarPreguntasDelExamen']);



    await TestBed.configureTestingModule({
      declarations: [ViewExamenPreguntasComponent],
      imports:[HttpClientModule, HttpClientTestingModule, ],
      providers: [ { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: PreguntaService, useValue: mockPreguntaService}
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
