import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../login/cerrar-sesion/cerrar-sesion.component';

@Component({
  selector: 'app-sidebar-userdesk',
  templateUrl: './sidebar-userdesk.component.html',
  styleUrls: ['./sidebar-userdesk.component.css']
})
export class SidebarUserDeskComponent implements OnInit  {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  // Método para abrir un diálogo
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


 

  cerrarSesion(): void {
    const confirmacion = window.confirm('¿Deseas cerrar la sesión?');

    if (confirmacion) {
      // Realiza las acciones para cerrar la sesión aquí
      // Por ejemplo, puedes eliminar la cookie de autenticación o realizar una solicitud HTTP al servidor para cerrar la sesión.

      // Ejemplo: Elimina una cookie llamada 'token'
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }
}
