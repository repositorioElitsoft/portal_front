import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRComponent } from './sidebar-r.component';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarRComponent', () => {
  let component: SidebarRComponent ;
  let fixture: ComponentFixture<SidebarRComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarRComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,MatSnackBarModule, MatIconModule // Add MatDialogModule to the imports
      ],
      providers: [ChangeDetectorRef, CategoriaService],
    });

    fixture = TestBed.createComponent(SidebarRComponent );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
