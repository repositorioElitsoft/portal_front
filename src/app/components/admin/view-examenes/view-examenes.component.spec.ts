import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExamenesComponent } from './view-examenes.component';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExamenService } from 'src/app/service/examen.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';

describe('ViewExamenesComponent', () => {
  let component: ViewExamenesComponent;
  let fixture: ComponentFixture<ViewExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewExamenesComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatPaginatorModule,
        FormsModule,
        MatInputModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
      providers: [ExamenService, HttpClient, LiveAnnouncer, MatDialogModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
