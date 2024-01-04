import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observacion, ObservacionDTO } from 'src/app/interface/observacionreclutador.interface';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { interval, Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { UserSesionDTO, User } from 'src/app/interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-perfil-usuario-r',
  templateUrl: './view-perfil-usuario-r.component.html',
  styleUrls: ['./view-perfil-usuario-r.component.css']
})
export class ViewPerfilUsuarioRComponent implements OnInit {
  usuarioData: any;
  observadoresData: ObservacionDTO[];
  nuevaObservacion: string = '';
  observaciones: ObservacionDTO[] = [];
  enEdicion: any;
  nombresUsuarios: Object[] = []; 
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
   apr_tec:'',
   apr_oper:'',
   obs_desc:'',
   obs_fec_cre: new Date(),
   obs_fec_mod:new Date(),
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
    public dialogRef: MatDialogRef<ViewPerfilUsuarioRComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioData = data.usuario;
    this.observadoresData = data.observadores;
  }
  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
    this.cargarObservaciones();
  }
cargarObservaciones() {
  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.id).subscribe(
    (observadores) => {
      this.observaciones = observadores;
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
    }
  );
}
guardarObservacion() {
  if (!this.nuevaObservacion.trim()) {
    this.openSnackBar('La observación no puede estar vacía', 'Cerrar');
    return;
  }
  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.id).subscribe(
    (observaciones) => {
      if (observaciones.length >= 10) {
        console.error('Se ha alcanzado el límite máximo de observaciones.');
        this.openSnackBar('Se ha alcanzado el límite máximo de observaciones', 'Cerrar');
        return;
      }
      const nuevaObservacion: ObservacionDTO = {
        obs_id: 0,
        id: 0,
        name: '',
        email: '',
        firstLastname: '',
        obs_desc: this.nuevaObservacion,
        obs_fec_cre: new Date(),
        obs_fec_mod: new Date(),
        apr_tec: '',
        apr_oper: '',
        apr_ger: '',
        usr_id_obs: this.usuarioGuardado.id ?? 0,
        usr_id_obs_mod: this.usuarioGuardado.id ?? 0,
        usr1_id: 0,
        usr2_email: '',
        usr2_ap_pat: '',
        usr2_nom: '',
        usr2_id: 0,
      };
      this.observacionService.guardarObservacionRec(nuevaObservacion, this.usuarioData.id, nuevaObservacion.usr_id_obs,
          nuevaObservacion.usr_id_obs_mod).subscribe(
        (resultado) => {
          this.cargarObservaciones(); 
          this.nuevaObservacion = ''; 
          this.openSnackBar('Observación guardada con éxito', 'Cerrar');
        },
        (error) => {
          console.error('Error al guardar la observación:', error);
          this.openSnackBar('Error al guardar la observación', 'Cerrar');
        }
      );
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
      this.openSnackBar('Error al cargar las observaciones', 'Cerrar');
    }
  );
}
  editarObservacion(obs_id: number) {
    this.enEdicion = obs_id;
}
actualizarObservacion(observadores: ObservacionDTO) {
  if (!observadores.obs_desc.trim()) {
    console.error('La descripción de la observación no puede estar vacía.');
    this.openSnackBar('La descripción de la observación no puede estar vacía', 'Cerrar');
    return;
  }
  observadores.usr_id_obs_mod = this.usuarioGuardado?.id ?? 0;
  this.observacionService.actualizarObservacionRec(observadores.id, observadores, observadores.usr_id_obs_mod).subscribe(
    (resultado) => {
      this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
      this.enEdicion = null; 
      this.cargarObservaciones();
    },
    (error) => {
      console.error('Error al actualizar la observación:', error);
      this.openSnackBar('Error al actualizar la observación', 'Cerrar');
    }
  );
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
}
