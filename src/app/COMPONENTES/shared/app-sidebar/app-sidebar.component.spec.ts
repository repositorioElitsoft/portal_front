import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSidebarComponent } from './app-sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

// Import MatDialog and MatDialogModule from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('AppSidebarComponent', () => {
  let component: AppSidebarComponent;
  let fixture: ComponentFixture<AppSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSidebarComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,MatSnackBarModule, MatIconModule // Add MatDialogModule to the imports
      ],
      providers: [ChangeDetectorRef, CategoriaService],
    });

    fixture = TestBed.createComponent(AppSidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
