import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ObservacionDTO } from 'src/app/interface/observation.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserService } from 'src/app/service/user.service';
import { UserSesionDTO, User } from 'src/app/interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { UserJob } from 'src/app/interface/user-job.interface';
import { UserJobService } from 'src/app/service/user-job.service';
import { ObservationRecruiterComponent } from '../observation-recruiter/observation-recruiter.component';
import { AuthService } from 'src/app/service/auth.service';
import { CreateUserJobApprovalDTO } from 'src/app/interface/user-job-approval.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-perfil-usuario-r',
  templateUrl: './view-perfil-usuario-r.component.html',
  styleUrls: ['./view-perfil-usuario-r.component.css']
})
export class ViewPerfilUsuarioRComponent implements OnInit {
  usuarioData: any;
  // observadoresData: ObservacionDTO[];
  nuevaObservacion: string = '';
  userJobId!: number; // Asigna el valor adecuado
  userJobApprovalDTO: CreateUserJobApprovalDTO | undefined;
  authorities!: Set<string>;
  observaciones: ObservacionDTO[] = [];
  enEdicion: any;
  nombresUsuarios: Object[] = [];
  userJob: UserJob[] = [];
  usuarioGuardado: UserSesionDTO = {
    id: 0,
    rut: '',
    name: '',
    firstLastname: '',
    secondLastname: '',
    email: '',
    phone: '',
  };
  panelOpenState = false;
  observadores: ObservacionDTO = {
    usr2_email: '',
    usr2_ap_pat: '',
    usr2_nom: '',
    usr2_id: 0,
    obs_id: 0,
    apr_ger: '',
    technicalApproval: '',
    operationalApproval: '',
    description: '',
    creationDate: new Date(),
    modificationDate: new Date(),
    usr1_id: 0,
    usr_id_obs: 0,
    usr_id_obs_mod: 0,
    id: 0,
    name: '',
    firstLastname: '',
    email: '',
  }

  constructor(
    private userService: UserService,
    private userjobservice: UserJobService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewPerfilUsuarioRComponent>,
    // public dialog: MatDialogRef<ViewPerfilUsuarioRComponent>,

    private uploadService: UploadFilesService,
    private herramientasService: HerramientasService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.usuarioData = data.usuario;
    console.log("data llegada: ", data)
    console.log("usuario data: ", this.usuarioData)

    // this.observadoresData = data.observadores;
  }
  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
    this.data.usuario.userJob.forEach(() => { });
    this.authorities = this.authService.getAuthorities();
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
              userJobId: id
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

  descargarCertificacion(certId: number): void {
    this.herramientasService.downloadCertification(certId)
      .subscribe((response: any) => {

        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = response.headers.get("pragma");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      }, (error: any) => {
        console.error('Error al descargar la certificación:', error);
        // Manejar el error según sea necesario
      });
  }
  aprobarObservacionUsuario(userJob: UserJob, i: number): void {
    console.log('userJobId:', userJob.id);

    const self = this; // Captura el valor de 'this'

    Swal.fire({
      title: '¿Deseas aprobar esta Postulación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aprobar Postulación',
      cancelButtonText: 'Rechazar Postulación',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border'
      }, showCloseButton: true, // Mostrar el botón de cierre
      closeButtonAriaLabel: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "Aceptar"
        enviarAprobacion(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // El usuario hizo clic en "Rechazar"
        enviarAprobacion(false);
      }
    });

    function enviarAprobacion(isApproved: boolean) {
      const userJobApprovalDTO = {
        isApproved: isApproved,
      };

      console.log('Objeto userJobApprovalDTO a enviar:', userJobApprovalDTO);

      self.userjobservice.aprobarObservacion(userJob.id, userJobApprovalDTO).subscribe({
        next: (response) => {
          console.log('userjob', self.usuarioData.userJob[i])
          self.usuarioData.userJob[i].approvals = response;
          console.log('Observation approved successfully:', response);

          // Mostrar un MatSnackBar
          if (isApproved) {
            self.mostrarSnackBar('Se ha aprobado la postulación');
          } else {
            self.mostrarSnackBar('Se ha rechazado la postulación');
          }
        },
        error: (error) => {
          console.error('Error approving observation:', error);
        },
      });
    }
  }

  mostrarSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal
      verticalPosition: 'bottom', // Posición vertical
    });
  }




}



