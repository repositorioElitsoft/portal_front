import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPositionUserComponent } from './add-position-user.component';

describe('AddPositionUserComponent', () => {
  let component: AddPositionUserComponent;
  let fixture: ComponentFixture<AddPositionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPositionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPositionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
