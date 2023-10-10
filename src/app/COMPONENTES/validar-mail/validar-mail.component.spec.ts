import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarMailComponent } from './validar-mail.component';

describe('ValidarMailComponent', () => {
  let component: ValidarMailComponent;
  let fixture: ComponentFixture<ValidarMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
