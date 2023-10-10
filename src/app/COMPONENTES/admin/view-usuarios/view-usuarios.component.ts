import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/service/usuario.service";

import Swal from "sweetalert2";

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarUsuario(usuario: any): void {
    // Implementa la lógica para actualizar el usuario
  }

  eliminarUsuario(usr_id: number): void {
    Swal.fire({
      title: 'Eliminar usuario',
      text: '¿Estás seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.usuarioService.eliminarUsuario(usr_id).subscribe(
          (data) => {
            Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado con éxito', 'success');
            this.obtenerUsuarios(); // Actualizar la lista de usuarios después de eliminar
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            console.log(error);
          }
        );
      }
    });
  }

  
}
