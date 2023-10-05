import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionRestaurarPassComponent } from './peticion-restaurar-pass.component';

describe('PeticionRestaurarPassComponent', () => {
  let component: PeticionRestaurarPassComponent;
  let fixture: ComponentFixture<PeticionRestaurarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeticionRestaurarPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeticionRestaurarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
