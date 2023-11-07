import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/service/usuario.service";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";

import Swal from "sweetalert2";

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog
    ) { }

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
     const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.updateUsuarioById(usuario.usr_id, result).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Actualizado', 'Usuario actualizado con éxito', 'success');
            this.obtenerUsuarios();
          },
          (error) => {
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
            console.log(error);
          }
        );
      }
    });
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
