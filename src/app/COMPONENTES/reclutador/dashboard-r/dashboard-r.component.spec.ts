import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRComponent } from './dashboard-r.component';

describe('DashboardRComponent', () => {
  let component: DashboardRComponent;
  let fixture: ComponentFixture<DashboardRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRComponent ]
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
