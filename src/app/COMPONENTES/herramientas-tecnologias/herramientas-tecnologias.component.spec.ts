import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasTecnologiasComponent } from './herramientas-tecnologias.component';

describe('HerramientasTecnologiasComponent', () => {
  let component: HerramientasTecnologiasComponent;
  let fixture: ComponentFixture<HerramientasTecnologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientasTecnologiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientasTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
