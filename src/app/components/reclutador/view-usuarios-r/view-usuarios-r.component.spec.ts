import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsuariosRComponent } from './view-usuarios-r.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/service/user.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule en lugar de MatSnackBar
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

describe('ViewUsuariosRComponent', () => {
  let component: ViewUsuariosRComponent;
  let fixture: ComponentFixture<ViewUsuariosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUsuariosRComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        UserService,
        LiveAnnouncer,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } },
        { provide: Router, useClass: Router } // Provide Router as a class
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUsuariosRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
