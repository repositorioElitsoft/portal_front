import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebar2Component } from './app-sidebar2.component';

describe('AppSidebar2Component', () => {
  let component: AppSidebar2Component;
  let fixture: ComponentFixture<AppSidebar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSidebar2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSidebar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
