import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPreguntaComponent } from './actualizar-pregunta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
class ActivatedRouteStub{
  params= of({/* */});
}
describe('ActualizarPreguntaComponent', () => {
  let component: ActualizarPreguntaComponent;
  let fixture: ComponentFixture<ActualizarPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPreguntaComponent ],
      imports:[HttpClientTestingModule, RouterModule],
      providers:[PreguntaService, Router, {provide:ActivatedRoute, useClass: ActivatedRouteStub}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
