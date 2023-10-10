import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarPassComponent } from './restaurar-pass.component';

describe('RestaurarPassComponent', () => {
  let component: RestaurarPassComponent;
  let fixture: ComponentFixture<RestaurarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
