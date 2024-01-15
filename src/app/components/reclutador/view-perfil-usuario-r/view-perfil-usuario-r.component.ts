import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ObservacionDTO } from 'src/app/interface/observation.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserService } from 'src/app/service/user.service';
import { UserSesionDTO, User } from 'src/app/interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserJob } from 'src/app/interface/user-job.interface';
import { UserJobService } from 'src/app/service/user-job.service';
import { ObservationRecruiterComponent } from '../observation-recruiter/observation-recruiter.component';

@Component({
  selector: 'app-view-perfil-usuario-r',
  templateUrl: './view-perfil-usuario-r.component.html',
  styleUrls: ['./view-perfil-usuario-r.component.css']
})
export class ViewPerfilUsuarioRComponent implements OnInit {
  usuarioData: any;
  // observadoresData: ObservacionDTO[];
  nuevaObservacion: string = '';
  observaciones: ObservacionDTO[] = [];
  enEdicion: any;
  nombresUsuarios: Object[] = []; 
  userJob: UserJob[] = []; 
  usuarioGuardado: UserSesionDTO = {
    id:0,
    rut: '',
    name: '',
    firstLastname: '',
    secondLastname: '',
    email: '',
    phone: '',
  };
  panelOpenState = false;
  observadores: ObservacionDTO ={
    usr2_email: '',
    usr2_ap_pat: '',
    usr2_nom: '',
    usr2_id: 0,
    obs_id: 0,
   apr_ger:'',
   technicalApproval:'',
   operationalApproval:'',
   description:'',
   creationDate: new Date(),
   modificationDate:new Date(),
   usr1_id: 0,
   usr_id_obs:0,    
   usr_id_obs_mod: 0,   
   id: 0,   
   name:'',
   firstLastname:'',
   email:'',
  }

  constructor(
    private userService: UserService,
    private userjobservice: UserJobService,
    private dialog: MatDialog,  
    public dialogRef: MatDialogRef<ViewPerfilUsuarioRComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioData = data.usuario;

    // this.observadoresData = data.observadores;
  }
  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
    this.data.usuario.userJob.forEach((job: { id: any; }) => {
      console.log('esta es una id que enviaré al hijo:', job);
    });
      
  }


  verObservacion(userJob: UserJob, idUserJob: number | null): void {
    const id = idUserJob !== null ? idUserJob : null; 
    console.log('userjob id : ', id);
  
    if (id !== null) {
      this.observacionService.obtenerObservacionesPorUserJob(id).subscribe({
        next: (data) => {
          console.log('Data llegada:', data);
          const dialogRef = this.dialog.open(ObservationRecruiterComponent, {
            width: '800px',
            height: '700px',
            data: {
              usuario: data,
              userJobId: id // Pasar el valor de id a ObservationRecruiterComponent
            }
          });
  
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            this.ObtenerUsuarioGuardado();
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.error('ID de UserJob no válido');
    }
  }
  
  
// cargarObservaciones() {
//   this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.id).subscribe(
//     (observadores) => {
//       this.observaciones = observadores;
//     },
//     (error) => {
//       console.error('Error al cargar las observaciones:', error);
//     }
//   );
// }
// guardarObservacion() {
//   if (!this.nuevaObservacion.trim()) {
//     this.openSnackBar('La observación no puede estar vacía', 'Cerrar');
//     return;
//   }
//   this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.id).subscribe(
//     (observaciones) => {
//       if (observaciones.length >= 10) {
//         console.error('Se ha alcanzado el límite máximo de observaciones.');
//         this.openSnackBar('Se ha alcanzado el límite máximo de observaciones', 'Cerrar');
//         return;
//       }
//       const nuevaObservacion: ObservacionDTO = {
//         obs_id: 0,
//         id: 0,
//         name: '',
//         email: '',
//         firstLastname: '',
//         description: this.nuevaObservacion,
//         creationDate: new Date(),
//         modificationDate: new Date(),
//         technicalApproval: '',
//         operationalApproval: '',
//         apr_ger: '',
//         usr_id_obs: this.usuarioGuardado.id ?? 0,
//         usr_id_obs_mod: this.usuarioGuardado.id ?? 0,
//         usr1_id: 0,
//         usr2_email: '',
//         usr2_ap_pat: '',
//         usr2_nom: '',
//         usr2_id: 0,
//       };
//       this.observacionService.crearObservacion(nuevaObservacion, this.usuarioData.id, nuevaObservacion.usr_id_obs,
//           nuevaObservacion.usr_id_obs_mod).subscribe(
//         (resultado) => {
//           // this.cargarObservaciones(); 
//           this.nuevaObservacion = ''; 
//           this.openSnackBar('Observación guardada con éxito', 'Cerrar');
//         },
//         (error) => {
//           console.error('Error al guardar la observación:', error);
//           this.openSnackBar('Error al guardar la observación', 'Cerrar');
//         }
//       );
//     },
//     (error) => {
//       console.error('Error al cargar las observaciones:', error);
//       this.openSnackBar('Error al cargar las observaciones', 'Cerrar');
//     }
//   );
// }
//   editarObservacion(obs_id: number) {
//     this.enEdicion = obs_id;
// }
// actualizarObservacion(observadores: ObservacionDTO) {
//   if (!observadores.description.trim()) {
//     console.error('La descripción de la observación no puede estar vacía.');
//     this.openSnackBar('La descripción de la observación no puede estar vacía', 'Cerrar');
//     return;
//   }
//   observadores.usr_id_obs_mod = this.usuarioGuardado?.id ?? 0;
//   this.observacionService.actualizarObservacion(observadores.id, observadores, observadores.usr_id_obs_mod).subscribe(
//     (resultado) => {
//       this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
//       this.enEdicion = null; 
//       // this.cargarObservaciones();
//     },
//     (error) => {
//       console.error('Error al actualizar la observación:', error);
//       this.openSnackBar('Error al actualizar la observación', 'Cerrar');
//     }
//   );
// }
  salir() {
    this.dialogRef.close();
  }
  ObtenerUsuarioGuardado() {
    this.userService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
