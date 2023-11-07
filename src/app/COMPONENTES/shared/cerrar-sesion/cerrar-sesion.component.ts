import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-advertencia-eliminar',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit  {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  
  ngOnInit(): void {}


  accepted: Boolean=false

cerrarSesion(): void {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/iniciar-sesion';

}
}

