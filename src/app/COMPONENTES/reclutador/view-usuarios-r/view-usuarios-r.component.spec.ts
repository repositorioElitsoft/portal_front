import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsuariosRComponent } from './view-usuarios-r.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioService } from 'src/app/service/usuario.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {  MatIconModule } from '@angular/material/icon';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


describe('ViewUsuariosRComponent', () => {
  let component: ViewUsuariosRComponent;
  let fixture: ComponentFixture<ViewUsuariosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsuariosRComponent ],
      imports:[HttpClientTestingModule,MatIconModule,MatPaginatorModule,MatTableModule, BrowserAnimationsModule,MatDialogModule,MatSnackBar],
      providers:[UsuarioService, LiveAnnouncer, Router, HttpClient,Animation,{provide: ActivatedRoute, useValue:"/**/"}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsuariosRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
