import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {

    constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    // Simplemente redirige a la página de inicio de sesión
    this.router.navigate(['/iniciar-sesion']);
  }
}
