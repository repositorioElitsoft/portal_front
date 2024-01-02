import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../login/cerrar-sesion/cerrar-sesion.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit  {

  constructor(private router: Router, 
    public dialog: MatDialog,
    private cookieService: CookieService){}

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.cookieService.delete('token')
    this.router.navigate(['/iniciar-sesion']);
  }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
