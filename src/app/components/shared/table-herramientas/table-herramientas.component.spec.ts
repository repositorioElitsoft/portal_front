import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableHerramientasComponent } from './table-herramientas.component';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TableHerramientasComponent', () => {
  let component: TableHerramientasComponent;
  let fixture: ComponentFixture<TableHerramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableHerramientasComponent],
      imports: [HttpClientTestingModule, MatCardModule,MatProgressSpinnerModule], // Quita { provide: MatCardModule, useValue: {} }
      providers: [HerramientasService]
    }).compileComponents();

    fixture = TestBed.createComponent(TableHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
