import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-sidebar2',
  templateUrl: './app-sidebar2.component.html',
  styleUrls: ['./app-sidebar2.component.css']
})
export class AppSidebar2Component implements OnInit  {

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    // Simplemente redirige a la página de inicio de sesión
    this.router.navigate(['/iniciar-sesion']);
  }

}
