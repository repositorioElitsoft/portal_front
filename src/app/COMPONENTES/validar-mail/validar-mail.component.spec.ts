import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarMailComponent } from './validar-mail.component';
import { ValidarMailService } from 'src/app/service/validar-mail.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ValidarMailComponent', () => {
  let component: ValidarMailComponent;
  let fixture: ComponentFixture<ValidarMailComponent>;


  const route = {
    queryParamMap: of({ get: (param: string) => 'yourMockedCodeValue' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarMailComponent ],
      imports: [HttpClientTestingModule],
      providers: [ValidarMailService,  
        { provide: ActivatedRoute, useValue: route } ]
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
