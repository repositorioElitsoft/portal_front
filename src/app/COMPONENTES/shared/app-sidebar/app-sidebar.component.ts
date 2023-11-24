import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CerrarSesionComponent } from '../cerrar-sesion/cerrar-sesion.component';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit  {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService){}

  ngOnInit(): void {

  }

  // Método para abrir un diálogo
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

