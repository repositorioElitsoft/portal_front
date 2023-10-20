import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerfilUsuarioRComponent } from './view-perfil-usuario-r.component';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
class ActivatedRouteStub{

  params= of({/* */});
}
describe('ViewPerfilUsuarioRComponent', () => {
  let component: ViewPerfilUsuarioRComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerfilUsuarioRComponent ],
      imports:[HttpClientTestingModule, RouterModule],
      providers:[HttpClient,UsuarioService, Router, {provide: ActivatedRoute, useClass:ActivatedRouteStub}],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPerfilUsuarioRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
