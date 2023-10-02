import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  cerrarSesion() {
    // Simplemente redirige a la página de inicio de sesión
    this.router.navigate(['/iniciar-sesion']);
  }

}
