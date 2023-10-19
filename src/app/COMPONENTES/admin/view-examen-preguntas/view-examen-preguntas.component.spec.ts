import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExamenPreguntasComponent } from './view-examen-preguntas.component';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';




describe('ViewExamenPreguntasComponent', () => {
  let component: ViewExamenPreguntasComponent;
  let fixture: ComponentFixture<ViewExamenPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewExamenPreguntasComponent],
      imports: [HttpClientTestingModule],
      providers: [PreguntaService, HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamenPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});