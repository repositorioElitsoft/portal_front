import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCertificationsDialogComponent } from './tool-certifications-dialog.component';

describe('ToolCertificationsDialogComponent', () => {
  let component: ToolCertificationsDialogComponent;
  let fixture: ComponentFixture<ToolCertificationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolCertificationsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolCertificationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
