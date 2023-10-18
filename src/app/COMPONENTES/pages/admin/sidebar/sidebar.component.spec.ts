import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { LoginService } from 'src/app/service/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatActionList, MatList, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CategoriaService } from 'src/app/service/categoria.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [MatCardModule, HttpClientTestingModule, MatListModule,MatIconModule], 
      providers: [LoginService,HttpClient,CategoriaService],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});