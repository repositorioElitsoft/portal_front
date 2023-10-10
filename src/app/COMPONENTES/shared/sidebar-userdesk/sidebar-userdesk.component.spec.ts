import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserDeskComponent } from './sidebar-userdesk.component';

describe('SidebarUserDeskComponent', () => {
  let component: SidebarUserDeskComponent;
  let fixture: ComponentFixture<SidebarUserDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUserDeskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUserDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
