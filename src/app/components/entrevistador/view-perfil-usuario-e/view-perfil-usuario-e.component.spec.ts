import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerfilUsuarioEComponent } from './view-perfil-usuario-e.component';

describe('ViewPerfilUsuarioEComponent', () => {
  let component: ViewPerfilUsuarioEComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerfilUsuarioEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPerfilUsuarioEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
