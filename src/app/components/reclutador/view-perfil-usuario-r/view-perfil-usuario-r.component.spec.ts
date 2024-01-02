import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPerfilUsuarioRComponent } from './view-perfil-usuario-r.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: (_param: string) => ['email'],
    },
  };
}

describe('ViewPerfilUsuarioRComponent', () => {
  let component: ViewPerfilUsuarioRComponent;
  let fixture: ComponentFixture<ViewPerfilUsuarioRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPerfilUsuarioRComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [HttpClientTestingModule, MatDialogModule, MatIconModule, MatTabsModule, MatListModule, BrowserAnimationsModule], // Agrega BrowserAnimationsModule aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPerfilUsuarioRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
