import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeReclutadorComponent } from './welcome-reclutador.component';

describe('WelcomeReclutadorComponent', () => {
  let component: WelcomeReclutadorComponent;
  let fixture: ComponentFixture<WelcomeReclutadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeReclutadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeReclutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
