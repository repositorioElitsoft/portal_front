import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserComponent } from './sidebar-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

describe('SidebarUserDeskComponent', () => {
  let component: SidebarUserComponent ;
  let fixture: ComponentFixture<SidebarUserComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarUserComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,MatSnackBarModule, MatIconModule // Add MatDialogModule to the imports
      ],
      providers: [ChangeDetectorRef, CategoriaService],
    });

    fixture = TestBed.createComponent(SidebarUserComponent );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
