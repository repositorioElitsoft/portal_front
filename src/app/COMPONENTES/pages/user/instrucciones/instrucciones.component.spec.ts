import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstruccionesComponent } from './instrucciones.component';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

describe('InstruccionesComponent', () => {
  let component: InstruccionesComponent;
  let fixture: ComponentFixture<InstruccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstruccionesComponent],
      imports: [HttpClientModule,RouterTestingModule,MatCardModule,MatDividerModule], // Agrega HttpClientModule
    }).compileComponents();

    fixture = TestBed.createComponent(InstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
