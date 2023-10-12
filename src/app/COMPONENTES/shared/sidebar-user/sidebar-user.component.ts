import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ValidarMailService } from 'src/app/service/validar-mail.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit  {

  constructor(private router: Router,
  private cookieService: CookieService){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    this.cookieService.delete('token')
    this.router.navigate(['/iniciar-sesion']);
  }


}
