import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CerrarSesionComponent } from '../cerrar-sesion/cerrar-sesion.component';

@Component({
  selector: 'app-sidebar-userdesk',
  templateUrl: './sidebar-userdesk.component.html',
  styleUrls: ['./sidebar-userdesk.component.css']
})
export class SidebarUserDeskComponent implements OnInit  {

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

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
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }
}
