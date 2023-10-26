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



describe('AddPreguntaComponent', () => {
  let component: AddPreguntaComponent;
  let fixture: ComponentFixture<AddPreguntaComponent>;

  let mockActivatedRoute={
    
    snapshot: {
      params:{
        exam_id: 'mi-examen-id', exam_titl: 'mi-examen-titl'
      }
    }
  };
  let mockPreguntaService= jasmine.createSpyObj(['guardarPregunta']);



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPreguntaComponent],
      imports: [
        HttpClientTestingModule,RouterModule,FormsModule,MatProgressSpinnerModule,ReactiveFormsModule,RouterTestingModule, ],
      providers: [ HttpClient,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {provide: PreguntaService, useValue:mockPreguntaService}

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
