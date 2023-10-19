import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsuariosComponent } from './view-usuarios.component';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewUsuariosComponent', () => {
  let component: ViewUsuariosComponent;
  let fixture: ComponentFixture<ViewUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsuariosComponent ],
      imports:[HttpClientTestingModule],
      providers:[UsuarioService, Router, ActivatedRoute, HttpClient],
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
