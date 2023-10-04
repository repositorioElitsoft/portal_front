import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-app-sidebar2',
  templateUrl: './app-sidebar2.component.html',
  styleUrls: ['./app-sidebar2.component.css']
})
export class AppSidebar2Component implements OnInit  {

  constructor(private router: Router, 
  private cookieService: CookieService){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    this.cookieService.delete('token')
    this.router.navigate(['/iniciar-sesion']);
  }

}
