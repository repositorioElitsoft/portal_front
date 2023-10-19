import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCategoriasComponent } from './view-categorias.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'; 



describe('ViewCategoriasComponent', () => {
  let component: ViewCategoriasComponent;
  let fixture: ComponentFixture<ViewCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCategoriasComponent],
      imports: [HttpClientTestingModule], // Agrega HttpClientModule aquí
      providers: [MatPaginator, MatSort, LiveAnnouncer, Router, MatDialog, MatSnackBar]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
