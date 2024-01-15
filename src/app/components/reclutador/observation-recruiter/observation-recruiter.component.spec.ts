import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationRecruiterComponent } from './observation-recruiter.component';

describe('ObservationRecruiterComponent', () => {
  let component: ObservationRecruiterComponent;
  let fixture: ComponentFixture<ObservationRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationRecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
