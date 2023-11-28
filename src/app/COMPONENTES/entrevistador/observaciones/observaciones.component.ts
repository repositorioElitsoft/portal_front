import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observacion } from 'src/app/interface/observacion.interface';
import { Usuario } from 'src/app/interface/user.interface';
import { ObservacionService } from 'src/app/service/observacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AddObservacionComponent } from '../add-observacion/add-observacion.component';
import { ViewObservacionesComponent } from '../view-observaciones/view-observaciones.component';
import { ViewPerfilUsuarioEComponent } from '../view-perfil-usuario-e/view-perfil-usuario-e.component';

const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent {

  displayedColumns: any[] = ['usr_nom', 'acciones'];
  filtro: string = '';
  originalDataCopy: Usuario[] = [];

  observaciones: Observacion[] = [];
  dataSource = new MatTableDataSource<Usuario>();

  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
    public observacionService:ObservacionService ){}

    ngOnInit(): void {
      this.obtenerUsuarios();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    obtenerUsuarios(): void {
      this.usuarioService.obtenerUsuarios().subscribe(
        (usuarios: Usuario[]) => {
          this.dataSource.data = usuarios; // Asigna datos de usuarios a la tabla
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


    agregarObservacion(usuarioId: number) {
      const dialogRef = this.dialog.open(AddObservacionComponent, {
        width: '400px',
        data: { usuarioId: usuarioId } // Pasar el ID del usuario al diálogo
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          const nuevaObservacion: Observacion = result; // Suponiendo que el diálogo devuelve la observación ingresada
          nuevaObservacion.usr_id = usuarioId; // Asigna el usuario correspondiente a la observación

          this.observacionService.guardarObservacion(nuevaObservacion).subscribe(
            (observacionGuardada: Observacion) => {
              // Actualizar la lista de observaciones asociadas al usuario
              this.obtenerObservacionesPorUsuario(usuarioId);
            },
            (error: any) => {
              console.error('Error al guardar la observación', error);
            }
          );
        }
      });
    }

    obtenerObservacionesPorUsuario(usuarioId: number) {
      this.observacionService.obtenerObservacionesPorUsuario(usuarioId).subscribe(
        (observaciones: Observacion[]) => {
          const dialogRef = this.dialog.open(ViewObservacionesComponent, {
            width: '400px',
            data: { observaciones: observaciones } // Pasar las observaciones al diálogo
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            // Lógica posterior a cerrar el diálogo si es necesaria
          });
        },
        (error: any) => {
          console.error('Error al obtener las observaciones del usuario', error);
        }
      );
    }


    openUserProfile(event: any){
      const email = event.target.parentElement.id;

      this.usuarioService.obtenerPerfil(email).subscribe({
        next:(user) => {
          const dialogRef = this.dialog.open(ViewPerfilUsuarioEComponent,{
            data: user
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });

        },
        error: (error) => {
          console.error('Error al obtener el perfil del usuario:', error);

        }
      });
    }

}
