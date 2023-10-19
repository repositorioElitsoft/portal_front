import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { AddUsuariosComponent } from './add-usuarios.component';

describe('AddUsuariosComponent', () => {
  let component: AddUsuariosComponent;
  let fixture: ComponentFixture<AddUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatCardModule], // Usa MatCardModule en lugar de MatCard
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});