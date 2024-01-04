import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { User } from 'src/app/interface/user.interface';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { AdvertenciaEliminarComponent } from "../../shared/advertencia-eliminar/advertencia-eliminar.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddUsuariosComponent } from "../add-usuarios/add-usuarios.component";
import { EditPerfilUsuarioAdminComponent } from "../edit-perfil-usuario-admin/edit-perfil-usuario-admin.component";


const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['name', 'email','roles', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: any[] = [];
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

  constructor(private userService: UserService,
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
      this.userService.obtenerUsuarios().subscribe(
        (data: any[]) => {

          const usuarios = data.map((usuario) => ({
            id: usuario.id || '',
            name: usuario.name || '',
            phone: usuario.phone || '',
            email: usuario.email || '',
            address:usuario.address || '',
            roles: usuario.roles || '',
            tools: usuario.herramientas,
            herr_ver: usuario.herramientas,
            herr_exp: usuario.herramientas,
          }));

          this.originalDataCopy = usuarios;
          this.dataSource.data = usuarios;
        },
        (error) => {
          console.log(error);
        }
      );
    }


    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

   openDialogEliminar(event: any) {

    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result){
        //#endregionconsole.log()
        this.userService.eliminarUsuarioId(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("User eliminado","Cerrar",{
              duration: 4000
            })
            this.obtenerUsuarios();
          },
          error:()=>{
            this._snackBar.open("Error al eliminar User","Cerrar",{
              duration: 4000
            })
          }
        })
      }
    });
  }





  
    editUser(event: any): void {
      // Obtiene el ID desde el elemento del botón que dispara el evento
      const id = event.target.parentElement.id;
       
      if (id) {
        // Llama al servicio para obtener los datos del usuario usando el ID
        this.userService.getUsuarioId(id).subscribe({
          next: (data) => {
            console.log('Data llegada:', data);
            // Abre el diálogo con los datos obtenidos
            const dialogRef = this.dialog.open(EditPerfilUsuarioAdminComponent, {
              width: '800px', 
              height: '700px',
              data: { usuarioId: id } // Pasa el ID del usuario al diálogo
            });
     
            // Maneja el resultado después de que el diálogo se cierre
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
              this.obtenerUsuarios();
            });
          },
          error: (error) => {
            console.log(error);
            // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
          }
        });
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
     }
    

}
