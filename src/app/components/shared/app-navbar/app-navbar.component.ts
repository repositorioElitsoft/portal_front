import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit  {
  constructor(private router: Router, 
  private cookieService: CookieService){}
  ngOnInit(): void {
  }
  cerrarSesion() {
    this.cookieService.delete('token')
    this.router.navigate(['/iniciar-sesion']);
  }
}
