import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardRComponent } from './dashboard-r.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarRComponent } from '../sidebar-r/sidebar-r.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


class ActivatedRouteStub {

  params = of({ /* */ });
}

describe('DashboardRComponent', () => {
  let component: DashboardRComponent;
  let fixture: ComponentFixture<DashboardRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardRComponent, SidebarRComponent],
      imports: [HttpClientTestingModule, RouterModule],
      providers: [Router, HttpClient,{ provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});