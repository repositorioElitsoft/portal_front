import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrefferedJobComponent } from './user-preffered-job.component';

describe('UserPrefferedJobComponent', () => {
  let component: UserPrefferedJobComponent;
  let fixture: ComponentFixture<UserPrefferedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPrefferedJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrefferedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
