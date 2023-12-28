import { Component } from '@angular/core';
import { CerrarSesionComponent } from '../../shared/cerrar-sesion/cerrar-sesion.component';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-e',
  templateUrl: './sidebar-e.component.html',
  styleUrls: ['./sidebar-e.component.css']
})
export class SidebarEComponent {


  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
