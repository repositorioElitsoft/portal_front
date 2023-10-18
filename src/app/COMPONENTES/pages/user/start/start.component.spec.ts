import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    // Crea un objeto ActivatedRoute mock
    const activatedRoute = {
      snapshot: {
        paramMap: new Map<string, string>(), // Puedes configurar los parámetros de la ruta si es necesario
      },
    };

    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [HttpClientModule, MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
