import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerfilUsuarioRComponent } from './edit-perfil-usuario-r.component';

describe('EditPerfilUsuarioRComponent', () => {
  let component: EditPerfilUsuarioRComponent;
  let fixture: ComponentFixture<EditPerfilUsuarioRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPerfilUsuarioRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPerfilUsuarioRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
