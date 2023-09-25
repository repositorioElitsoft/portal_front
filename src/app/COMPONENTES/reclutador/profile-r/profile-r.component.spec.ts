import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRComponent } from './profile-r.component';

describe('ProfileRComponent', () => {
  let component: ProfileRComponent;
  let fixture: ComponentFixture<ProfileRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
