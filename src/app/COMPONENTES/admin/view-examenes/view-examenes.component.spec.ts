import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamenesComponent } from './view-examenes.component';
import { ExamenService } from 'src/app/service/examen.service';




class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
}

describe('ViewExamenesComponent', () => {
  let component: ViewExamenesComponent;
  let fixture: ComponentFixture<ViewExamenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExamenesComponent ],
      providers: [ ExamenService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
