import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarPassComponent } from './restaurar-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, ParamMap, Router, convertToParamMap } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

class MockActivatedRoute {
  paramMap: Observable<ParamMap> = of(convertToParamMap({ id: 'your-test-id' }));
  // Add other properties/methods you need here
}
describe('RestaurarPassComponent', () => {
  let component: RestaurarPassComponent;
  let fixture: ComponentFixture<RestaurarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarPassComponent ],
      imports:[HttpClientModule, ReactiveFormsModule, MatCardModule],
      providers:[UsuarioService,Router,NotificationService,{ provide: ActivatedRoute, useClass: MockActivatedRoute }]
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
