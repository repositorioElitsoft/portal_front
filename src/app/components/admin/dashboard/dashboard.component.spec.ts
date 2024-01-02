import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppNavbarComponent } from '../../shared/app-navbar/app-navbar.component';
import { AppSidebarComponent } from '../../shared/app-sidebar/app-sidebar.component';
import { AppSidebar2Component } from '../../shared/app-sidebar2/app-sidebar2.component';
import { of } from 'rxjs';
class ActivatedRouteStub{

  params= of({/* */});
}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, AppNavbarComponent, AppSidebarComponent, AppSidebar2Component],
      imports:[HttpClientModule, RouterModule],
      providers:[Router,HttpClient,{provide:ActivatedRoute ,useClass:ActivatedRouteStub}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
