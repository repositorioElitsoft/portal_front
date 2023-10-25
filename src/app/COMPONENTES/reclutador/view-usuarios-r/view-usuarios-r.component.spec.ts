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

class ActivatedRouteStub{
params=of({/* */});
}0
describe('ViewUsuariosRComponent', () => {
  let component: ViewUsuariosRComponent;
  let fixture: ComponentFixture<ViewUsuariosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsuariosRComponent ],
      imports:[HttpClientTestingModule,MatIconModule,MatPaginatorModule,MatTableModule, BrowserAnimationsModule],
      providers:[UsuarioService, LiveAnnouncer, Router, HttpClient,Animation,{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
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
