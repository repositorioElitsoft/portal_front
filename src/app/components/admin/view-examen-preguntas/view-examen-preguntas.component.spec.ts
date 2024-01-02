import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExamenPreguntasComponent } from './view-examen-preguntas.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';




describe('ViewExamenPreguntasComponent', () => {
  let component: ViewExamenPreguntasComponent;
  let fixture: ComponentFixture<ViewExamenPreguntasComponent>;


  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ViewExamenPreguntasComponent],
      imports:[HttpClientModule, HttpClientTestingModule, RouterModule, MatCardModule, FormsModule],
      providers: [ PreguntaService ,HttpClient, {provide: ActivatedRoute, useValue:{snapshot:{params:{exam_id:'exam_id',exam_titl:'exam_titl'}}}}
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
