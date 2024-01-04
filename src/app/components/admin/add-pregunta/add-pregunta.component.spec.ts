import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPreguntaComponent } from './add-pregunta.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

describe('AddPreguntaComponent', () => {
  let component: AddPreguntaComponent;
  let fixture: ComponentFixture<AddPreguntaComponent>;

  let mockActivatedRoute={
    
    snapshot: {
      params:{
        exam_id: 'mi-examen-id', exam_titl: 'mi-examen-degree'
      }
    }
  };
  let mockPreguntaService= jasmine.createSpyObj(['guardarPregunta']);



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreguntaComponent],
      imports:[RouterTestingModule,HttpClientTestingModule,RouterModule,MatCardModule,FormsModule],
      providers:[PreguntaService,HttpClient,{provide: ActivatedRoute, useValue:{snapshot:{params:{exam_id:'exam_id',exam_titl:'exam_titl'}}}}]
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
