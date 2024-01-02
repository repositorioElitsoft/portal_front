import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEComponent } from './sidebar-e.component';

describe('SidebarEComponent', () => {
  let component: SidebarEComponent;
  let fixture: ComponentFixture<SidebarEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
