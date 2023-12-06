import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observacion, ObservacionDTO } from 'src/app/interface/observacionreclutador.interface';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { interval, Subscription } from 'rxjs';
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
  private observacionesSubscription!: Subscription;
  enEdicion: any;
  nombresUsuarios: Object[] = []; // Inicializado con un arreglo vacío
  usuarioGuardado: UserSesionDTO = {
    usr_id:0,
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_tel: '',
  };


  observadores: ObservacionDTO ={


    usr2_email: '', // ID del Usuario que la modificó
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
   usr_id_obs:0,    // ID del Usuario que hizo la observación
   usr_id_obs_mod: 0,   // ID del Usuario que modificó la observación
   // Campos de la entidad Usuario
   usr_id: 0,   // ID del Usuario que hizo la observación
   usr_nom:'',
   usr_ap_pat:'',
   usr_email:'',


  }



  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  }







// Variable para almacenar las observaciones

// Función para cargar observaciones desde el backend
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

// Función para guardar una nueva observación
guardarObservacion() {
  if (!this.nuevaObservacion.trim()) {
    console.error('La observación no puede estar vacía.');
    this.openSnackBar('La observación no puede estar vacía', 'Cerrar');
    return;
  }

  // Obtener observaciones actuales del servidor
  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.usr_id).subscribe(
    (observaciones) => {
      if (observaciones.length >= 10) {
        console.error('Se ha alcanzado el límite máximo de observaciones.');
        this.openSnackBar('Se ha alcanzado el límite máximo de observaciones', 'Cerrar');
        return;
      }

      // Proceder con la creación de la nueva observación si el límite no se ha alcanzado
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

      // Llama al servicio para guardar la nueva observación en el backend
      this.observacionService.guardarObservacionRec(nuevaObservacion, this.usuarioData.usr_id, nuevaObservacion.usr_id_obs,
          nuevaObservacion.usr_id_obs_mod).subscribe(
        (resultado) => {
          console.log('Observación guardada con éxito', resultado);
          this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
          this.nuevaObservacion = ''; // Limpia el área de texto
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
    console.log('Iniciando la edición de la observación', obs_id);

    // Antes de cambiar el estado, puedes imprimir el estado actual para comparar
    console.log('Estado actual de enEdicion antes de la edición:', this.enEdicion);

    this.enEdicion = obs_id;

    // Después de cambiar el estado, imprime el nuevo estado para confirmar el cambio
    console.log('Estado actualizado de enEdicion después de la edición:', this.enEdicion);
}


actualizarObservacion(observadores: ObservacionDTO) {
  // Verificar si la descripción de la observación está vacía
  if (!observadores.obs_desc.trim()) {
      console.error('La descripción de la observación no puede estar vacía.');
      this.openSnackBar('La descripción de la observación no puede estar vacía', 'Cerrar');
      return;
  }

  // Establece el usr_id_obs_mod al ID del usuario actual
  observadores.usr_id_obs_mod = this.usuarioGuardado?.usr_id ?? 0;

  this.observacionService.actualizarObservacionRec(observadores.usr_id, observadores, observadores.usr_id_obs_mod).subscribe(
      (resultado) => {
          console.log('Observación actualizada con éxito', resultado);
          this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
          this.enEdicion = null; // Salir del modo de edición
          this.cargarObservaciones(); // Opcional, para recargar las observaciones
      },
      (error) => {
          console.error('Error al actualizar la observación:', error);
          this.openSnackBar('Error al actualizar la observación', 'Cerrar');
      }
  );
}



  salir() {

    this.dialogRef.close();
    console.log('Se ha cerrado la ventana')

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
