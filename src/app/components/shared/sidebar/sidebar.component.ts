import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../login/cerrar-sesion/cerrar-sesion.component';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  authorities!: Set<string>;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private authService: AuthService,


  ) { }
  ngOnInit(): void {
    this.authorities = this.authService.getAuthorities();
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log('permisos: ', this.authorities);
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  cerrarSesion(): void {
    const confirmacion = window.confirm('¿Deseas cerrar la sesión?');
    if (confirmacion) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }
}