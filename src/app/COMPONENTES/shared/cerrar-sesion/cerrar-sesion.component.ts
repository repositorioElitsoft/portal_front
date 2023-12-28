import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-advertencia-eliminar',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit  {

  constructor(
    public dialog: MatDialog,
  ) {}


  ngOnInit(): void {}


  accepted: Boolean=false

cerrarSesion(): void {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/iniciar-sesion';
}

}
