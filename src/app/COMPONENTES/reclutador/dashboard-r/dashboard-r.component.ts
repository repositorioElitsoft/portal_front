import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-r',
  templateUrl: './dashboard-r.component.html',
  styleUrls: ['./dashboard-r.component.css']
})
export class DashboardRComponent implements OnInit {

  constructor(private router: Router) { }

ngOnInit(): void {
}

cerrarSesion() {
  // Simplemente redirige a la página de inicio de sesión
  this.router.navigate(['/iniciar-sesion']);
}
}
