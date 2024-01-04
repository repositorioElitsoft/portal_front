import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarComponent } from './registrar.component';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
class ActivatedRouteStub{

  params= of({/* */});
}
describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule,RouterModule],
      providers:[UserService, Router, NotificationService,HttpClient,{provide: ActivatedRoute, useClass:ActivatedRouteStub}],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
