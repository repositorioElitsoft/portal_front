import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenModalComponent } from './examen-modal.component';

describe('ExamenModalComponent', () => {
  let component: ExamenModalComponent;
  let fixture: ComponentFixture<ExamenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
