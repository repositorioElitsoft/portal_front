import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCategoriasComponent } from './view-categorias.component';
import { CategoriaService } from 'src/app/service/categoria.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewCategoriasComponent', () => {
  let component: ViewCategoriasComponent;
  let fixture: ComponentFixture<ViewCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoriasComponent ],
      imports:[HttpClientTestingModule],
      providers:[CategoriaService,HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
