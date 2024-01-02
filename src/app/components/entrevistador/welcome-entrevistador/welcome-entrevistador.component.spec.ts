import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeEntrevistadorComponent } from './welcome-entrevistador.component';

describe('WelcomeEntrevistadorComponent', () => {
  let component: WelcomeEntrevistadorComponent;
  let fixture: ComponentFixture<WelcomeEntrevistadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeEntrevistadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeEntrevistadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
