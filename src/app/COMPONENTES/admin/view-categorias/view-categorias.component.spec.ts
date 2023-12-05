import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCategoriasComponent } from './view-categorias.component';
import { CategoriaService } from 'src/app/service/categoria.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ViewCategoriasComponent', () => {
  let component: ViewCategoriasComponent;
  let fixture: ComponentFixture<ViewCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoriasComponent ],
      imports:[HttpClientTestingModule,MatDialogModule],
      providers:[CategoriaService],
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
