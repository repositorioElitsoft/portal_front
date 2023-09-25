import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerfilUsuarioComponent } from './view-perfil-usuario.component';

describe('ViewPerfilUsuarioComponent', () => {
  let component: ViewPerfilUsuarioComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerfilUsuarioComponent ]
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
