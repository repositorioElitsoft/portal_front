import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../shared/cerrar-sesion/cerrar-sesion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar-r',
  templateUrl: './sidebar-r.component.html',
  styleUrls: ['./sidebar-r.component.css']
})
export class SidebarRComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService){}

  ngOnInit(): void {

  }

  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(CerrarSesionComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  
  }
   