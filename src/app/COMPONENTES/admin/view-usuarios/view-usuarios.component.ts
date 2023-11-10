import { Router } from "@angular/router";
import { UsuarioService } from "src/app/service/usuario.service";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Usuario } from 'src/app/interface/user.interface';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { AdvertenciaEliminarComponent } from "../../shared/advertencia-eliminar/advertencia-eliminar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";


const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['usr_nom', 'usr_email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: Usuario[] = [];
  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  versiones: VersionProducto[] = [];

  selectedCategoria: number = 0;
  selectedProducto: number = 0;
  selectedVersion: number = 0;
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.obtenerUsuarios();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    obtenerUsuarios(): void {
      this.usuarioService.obtenerUsuarios().subscribe(
        (data: any[]) => {

          const usuarios = data.map((usuario) => ({
            usr_id: usuario.usr_id || '',
            usr_nom: usuario.usr_nom || '',
            usr_tel: usuario.usr_tel || '',
            usr_email: usuario.usr_email || '',
            usr_herr: usuario.herramientas,
            herr_ver: usuario.herramientas,
            herr_exp: usuario.herramientas
          }));

          this.originalDataCopy = usuarios;
          this.dataSource.data = usuarios;
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
        this.usuarioService.eliminarUsuarioId(usr_id).subscribe(
          (data) => {
            Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado con éxito', 'success');
            this.obtenerUsuarios(); // Actualizar la lista de usuarios después de eliminar
          });
      }  
    });
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

    //eliminarUsuario(usuarioId: number) {
     // this.usuarioService.eliminarUsuarioId(usuarioId).subscribe(
      //  (response) => {
      //    console.log('Usuario eliminado:', response);
      //    this.obtenerUsuarios();
      //  },
      //  (error) => {
      //    console.error('Error al eliminar usuario:', error);

     //     if (error.error && typeof error.error === 'string') {
     //       console.log('Respuesta del servidor (texto):', error.error);
     //     }
     //   }
    //  );
   // }

   openDialogEliminar(event: any) {

    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result){
        //#endregionconsole.log()
        this.usuarioService.eliminarUsuarioId(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("Usuario eliminado","Cerrar",{
              duration: 4000
            })
            this.obtenerUsuarios();
          },
          error:()=>{
            this._snackBar.open("Error al eliminar Usuario","Cerrar",{
              duration: 4000
            })
          }
        })
      }
    });
  }

    editUser(event: any){
      const id = event.target.parentElement.id

      this.router.navigate(["/admin/actualizar-usuario/"+id])
    }

}