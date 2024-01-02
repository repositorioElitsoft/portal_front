import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerfilUsuarioComponent } from './view-perfil-usuario.component';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { of } from 'rxjs';

describe('ViewPerfilUsuarioComponent', () => {
  let component: ViewPerfilUsuarioComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerfilUsuarioComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule,RouterModule,RouterTestingModule.withRoutes([])],
      providers:[HttpClient, UsuarioService, Router, { provide: ActivatedRoute, useValue: { snapshot: { params: { email: 'email' } } } }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
