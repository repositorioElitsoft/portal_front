import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSidebar2Component } from './app-sidebar2.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

// Import MatDialog and MatDialogModule from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppSidebar2Component', () => {
  let component: AppSidebar2Component;
  let fixture: ComponentFixture<AppSidebar2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSidebar2Component],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,MatSnackBarModule // Add MatDialogModule to the imports
      ],
      providers: [ChangeDetectorRef, CategoriaService],
    });

    fixture = TestBed.createComponent(AppSidebar2Component);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
