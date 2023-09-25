import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsuariosRComponent } from './view-usuarios-r.component';

describe('ViewUsuariosRComponent', () => {
  let component: ViewUsuariosRComponent;
  let fixture: ComponentFixture<ViewUsuariosRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsuariosRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsuariosRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
