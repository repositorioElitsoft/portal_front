import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositionUserComponent } from './edit-position-user.component';

describe('EditPositionUserComponent', () => {
  let component: EditPositionUserComponent;
  let fixture: ComponentFixture<EditPositionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPositionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPositionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
