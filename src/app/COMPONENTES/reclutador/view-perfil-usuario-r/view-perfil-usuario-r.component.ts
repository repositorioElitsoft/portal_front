import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observacion, ObservacionDTO } from 'src/app/interface/observacionreclutador.interface';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserSesionDTO, Usuario } from 'src/app/interface/user.interface';
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
    usr_id:0,
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_tel: '',
  };

  panelOpenState = false;
  observadores: ObservacionDTO = {
    usr2_email: '', // ID del Usuario que la modificó
    usr2_ap_pat: '',
    usr2_nom: '',
    usr2_id: 0,

    obs_id: 0,
    apr_ger: '',
    apr_tec: '',
    apr_oper: '',
    obs_desc: '',
    obs_fec_cre: new Date(),
    obs_fec_mod: new Date(),
    usr1_id: 0,
    usr_id_obs: 0,    // ID del Usuario que hizo la observación
    usr_id_obs_mod: 0,   // ID del Usuario que modificó la observación
    // Campos de la entidad Usuario
    usr_id: 0,   // ID del Usuario que hizo la observación
    usr_nom: '',
    usr_ap_pat: '',
    usr_email: '',


  }



  constructor(
    private usuarioService: UsuarioService,
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
  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.usr_id).subscribe(
    (observadores) => {
      this.observaciones = observadores;
      console.log('Observaciones cargadas:', observadores);
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
    }
  );
}


guardarObservacion() {
  if (!this.nuevaObservacion.trim()) {
    console.error('La observación no puede estar vacía.');
    this.openSnackBar('La observación no puede estar vacía', 'Cerrar');
    return;
  }

  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.usr_id).subscribe(
    (observaciones) => {
      if (observaciones.length >= 10) {
        console.error('Se ha alcanzado el límite máximo de observaciones.');
        this.openSnackBar('Se ha alcanzado el límite máximo de observaciones', 'Cerrar');
        return;
      }

      const nuevaObservacion: ObservacionDTO = {
        obs_id: 0,
        usr_id: 0,
        usr_nom: '',
        usr_email: '',
        usr_ap_pat: '',
        obs_desc: this.nuevaObservacion,
        obs_fec_cre: new Date(),
        obs_fec_mod: new Date(),
        apr_tec: '',
        apr_oper: '',
        apr_ger: '',
        usr_id_obs: this.usuarioGuardado.usr_id ?? 0,
        usr_id_obs_mod: this.usuarioGuardado.usr_id ?? 0,
        usr1_id: 0,
        usr2_email: '',
        usr2_ap_pat: '',
        usr2_nom: '',
        usr2_id: 0,
      };

      this.observacionService.guardarObservacionRec(nuevaObservacion, this.usuarioData.usr_id, nuevaObservacion.usr_id_obs,
          nuevaObservacion.usr_id_obs_mod).subscribe(
        (resultado) => {
          console.log('Observación guardada con éxito', resultado);
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

  observadores.usr_id_obs_mod = this.usuarioGuardado?.usr_id ?? 0;
  this.observacionService.actualizarObservacionRec(observadores.usr_id, observadores, observadores.usr_id_obs_mod).subscribe(
    (resultado) => {
      console.log('Observación actualizada con éxito', resultado);
      this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
      this.enEdicion = null; // Salir del modo de edición
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
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        console.log(this.usuarioGuardado);
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
