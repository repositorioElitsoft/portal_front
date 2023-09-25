import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-r',
  templateUrl: './sidebar-r.component.html',
  styleUrls: ['./sidebar-r.component.css']
})
export class SidebarRComponent implements OnInit {

  constructor(private router: Router) { }

ngOnInit(): void {
}

cerrarSesion() {
  // Simplemente redirige a la página de inicio de sesión
  this.router.navigate(['/iniciar-sesion']);
}
}
