import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  authorities!: Set<string>;
  constructor(private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.authorities = this.authService.getAuthorities();

  }
  cerrarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }
}
