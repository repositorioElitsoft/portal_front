import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPreguntaComponent } from './add-pregunta.component';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let mok

describe('AddPreguntaComponent', () => {
  let component: AddPreguntaComponent;
  let fixture: ComponentFixture<AddPreguntaComponent>;

  /*let mockActivatedRoute={
    
    snapshot: {
      params:{
        exam_id: 'mi-examen-id', exam_titl: 'mi-examen-titl'
      }
    }
  };
  */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPreguntaComponent],
      imports: [
        HttpClientTestingModule,RouterModule,FormsModule,MatProgressSpinnerModule,ReactiveFormsModule,RouterTestingModule, ],
      providers: [
        PreguntaService, HttpClient,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { exam_id: 'exam_id',exam_titl:'exam_titl'} } } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
