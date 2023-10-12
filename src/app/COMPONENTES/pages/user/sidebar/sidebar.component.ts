import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-sidebar-user-exam',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorias:any;

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    public login:LoginService
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        console.log(data);
        this.categorias = data;
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar las categorías','',{
          duration:3000
        })
        console.log(error);
      }
    )
  }


  cerrarSesion(): void {
    const confirmacion = window.confirm('¿Deseas cerrar la sesión?');

    if (confirmacion) {
      // Realiza las acciones para cerrar la sesión aquí
      // Por ejemplo, puedes eliminar la cookie de autenticación o realizar una solicitud HTTP al servidor para cerrar la sesión.

      // Ejemplo: Elimina una cookie llamada 'token'
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }

}
