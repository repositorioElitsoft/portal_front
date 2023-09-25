import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerfilUsuarioRComponent } from './view-perfil-usuario-r.component';

describe('ViewPerfilUsuarioRComponent', () => {
  let component: ViewPerfilUsuarioRComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerfilUsuarioRComponent ]
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
