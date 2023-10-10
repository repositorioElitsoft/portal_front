import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit  {

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    // Simplemente redirige a la página de inicio de sesión
    this.router.navigate(['/iniciar-sesion']);
  }

}
