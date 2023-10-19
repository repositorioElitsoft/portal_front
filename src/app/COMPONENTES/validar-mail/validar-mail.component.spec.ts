import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarMailComponent } from './validar-mail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule para proporcionar ActivatedRoute

describe('ValidarMailComponent', () => {
  let component: ValidarMailComponent;
  let fixture: ComponentFixture<ValidarMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarMailComponent],
      imports: [HttpClientModule, RouterTestingModule], // Usa RouterTestingModule en lugar de ActivatedRoute
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
