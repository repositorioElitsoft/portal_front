import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEComponent } from './profile-e.component';

describe('ProfileEComponent', () => {
  let component: ProfileEComponent;
  let fixture: ComponentFixture<ProfileEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
