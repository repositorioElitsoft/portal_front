import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHerramientasComponent } from './table-herramientas.component';

describe('TableHerramientasComponent', () => {
  let component: TableHerramientasComponent;
  let fixture: ComponentFixture<TableHerramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHerramientasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
