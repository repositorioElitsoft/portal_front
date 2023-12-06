import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEResponsiveComponent } from './sidebar-e-responsive.component';

describe('SidebarEResponsiveComponent', () => {
  let component: SidebarEResponsiveComponent;
  let fixture: ComponentFixture<SidebarEResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarEResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
