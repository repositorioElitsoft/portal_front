import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadExamenComponent } from './load-examen.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const activatedRouteMock = {
  paramMap: of({ get: (param: string) => 'catId' }) // Mock the paramMap with a method to return a value
};

describe('LoadExamenComponent', () => {
  let component: LoadExamenComponent;
  let fixture: ComponentFixture<LoadExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadExamenComponent ],
      providers:[ { provide: ActivatedRoute, useValue: activatedRouteMock } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
