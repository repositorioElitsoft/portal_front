import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaEliminarComponent } from './advertencia-eliminar.component';

describe('AdvertenciaEliminarComponent', () => {
  let component: AdvertenciaEliminarComponent;
  let fixture: ComponentFixture<AdvertenciaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertenciaEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertenciaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
