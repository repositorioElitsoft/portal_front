import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsuariosComponent } from './view-usuarios.component';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
class ActivatedRouteStub{

  params= of({/* */});
}
describe('ViewUsuariosComponent', () => {
  let component: ViewUsuariosComponent;
  let fixture: ComponentFixture<ViewUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsuariosComponent ],
      imports:[HttpClientTestingModule],
      providers:[UsuarioService, Router,HttpClient,{provide: ActivatedRoute, useClass:ActivatedRouteStub} ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
