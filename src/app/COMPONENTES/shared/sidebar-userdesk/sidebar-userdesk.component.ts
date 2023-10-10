import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar-userdesk',
  templateUrl: './sidebar-userdesk.component.html',
  styleUrls: ['./sidebar-userdesk.component.css']
})
export class SidebarUserDeskComponent implements OnInit  {

  constructor(private router: Router, 
  private cookieService: CookieService){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    this.cookieService.delete('token')
    this.router.navigate(['/iniciar-sesion']);
  }


}
