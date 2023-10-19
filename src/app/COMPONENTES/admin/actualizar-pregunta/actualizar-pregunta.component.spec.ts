import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs'; // Import 'of' from 'rxjs' for mock data
import { ActualizarPreguntaComponent } from './actualizar-pregunta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

// Define una clase stub para ActivatedRoute
class ActivatedRouteStub {
  private subject = new BehaviorSubject(convertToParamMap({ id: 123 }));
  paramMap = this.subject.asObservable();
}
describe('ActualizarPreguntaComponent', () => {
  let component: ActualizarPreguntaComponent;
  let fixture: ComponentFixture<ActualizarPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarPreguntaComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        // Proporciona la clase stub ActivatedRouteStub en lugar de ActivatedRoute real.
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        PreguntaService,
      ],
    });

    fixture = TestBed.createComponent(ActualizarPreguntaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
