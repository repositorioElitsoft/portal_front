import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observacion } from 'src/app/interface/observacionreclutador.interface';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserSesionDTO, Usuario } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-view-perfil-usuario-r',
  templateUrl: './view-perfil-usuario-r.component.html',
  styleUrls: ['./view-perfil-usuario-r.component.css']
})
export class ViewPerfilUsuarioRComponent implements OnInit {
  usuarioData: any;
  observacionesData: Observacion[];
  nuevaObservacion: string = '';
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





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<ViewPerfilUsuarioRComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService
  ) {
    this.usuarioData = data.usuario;
    this.observacionesData = data.observaciones;
  }

  ngOnInit(): void {

    this.ObtenerUsuarioGuardado();
    this.obtenerNombresUsuarios();
    console.log('Perfil del usuario:', this.usuarioData);
    console.log('Observaciones del usuario:', this.observacionesData);
  }



  

  cargarObservaciones() {
    // Llama al servicio para obtener las observaciones del usuario desde el backend
    this.observacionService.obtenerObservacionesPorUsuario(this.usuarioData.usr_id).subscribe(
      (observaciones) => {
        // Puedes realizar acciones adicionales aquí si es necesario, como filtrar, ordenar o procesar los datos recibidos
        console.log('Observaciones cargadas:', observaciones);
      },
      (error) => {
        console.error('Error al cargar las observaciones:', error);
      }
    );
  }

  // eliminarObservacion(obsrec_id: number) {
  //   console.log('Eliminar observación', obsrec_id);
  //   const index = this.observacionesData.findIndex((observacion) => observacion.obsrec_id === obsrec_id);
  //   if (index !== -1) {
  //     this.observacionesData.splice(index, 1);

  //     // Llama a tu servicio para eliminarla en el backend
  //     this.observacionService.eliminarObservacion(obsrec_id).subscribe(
  //       () => {
  //         console.log('Observación eliminada con éxito en el backend');
  //       },
  //       (error) => {
  //         console.error('Error al eliminar la observación en el backend:', error);
  //       }
  //     );
  //   }
  // }

  guardarObservacion() {
    if (!this.nuevaObservacion.trim()) {
      console.error('La observación no puede estar vacía.');
      return;
    }
  
    // Crea una nueva observación con el texto ingresado y otros campos necesarios
    const nuevaObservacion: Observacion = {
      obs_id: 0, // Asumiendo que el backend asignará un ID
      obs_desc: this.nuevaObservacion,
      obs_fec_cre: new Date(), // Puede ser manejado por el backend
      obs_fec_mod: new Date(), // Puede ser manejado por el backend
      apr_oper: '', // Valores predeterminados o obtenidos del usuario
      apr_tec: '',
      apr_ger: '',
      usr_id_obs:  this.usuarioGuardado.usr_id ?? 0, // Asumiendo que estos valores están disponibles
      usr_id_obs_mod: this.usuarioGuardado.usr_id ?? 0,
    };

    // Llama al servicio para guardar la nueva observación en el backend
    this.observacionService.guardarObservacionRec(nuevaObservacion, this.usuarioData.usr_id, nuevaObservacion.usr_id_obs,
       nuevaObservacion.usr_id_obs_mod).subscribe(
      (resultado) => {               
        // Guardado exitoso
        console.log('Observación guardada con éxito', resultado);
        this.nuevaObservacion = ''; // Limpia el área de texto
        this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
      },
      (error) => {
        console.error('Error al guardar la observación:', error);
      }
    );
  }

  editarObservacion(obsrec_id: number) {
    this.enEdicion = obsrec_id;
  }
  
  actualizarObservacion(observacion: Observacion) {
    // Establece el usr_id_obs_mod al ID del usuario actual
    observacion.usr_id_obs_mod = this.usuarioGuardado?.usr_id ?? 0; // Usar 0 como valor por defecto o ajustar a un valor adecuado

    this.observacionService.actualizarObservacionRec(observacion.obs_id, observacion, observacion.usr_id_obs_mod).subscribe(
        (resultado) => {
            console.log('Observación actualizada con éxito', resultado);
            this.enEdicion = null; // Salir del modo de edición
            this.cargarObservaciones(); // Opcional, para recargar las observaciones
        },
        (error) => {
            console.error('Error al actualizar la observación:', error);
        }
    );
}


  
  salir() {
  
    this.dialogRef.close();
    console.log('Se ha cerrado la ventana')
  
  }
  
   obtenerNombresUsuarios() {
    this.observacionService.obtenerNombresUsuarios().subscribe(
      (data) => {
        this.nombresUsuarios = data;
      },
      (error) => {
        console.error('Error al obtener los nombres de usuarios:', error);
      }
    );
  }

  ObtenerUsuarioGuardado() {
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        console.log(this.usuarioGuardado);
       

        const inputElement = document.getElementById("inputTelefono");
        console.log(inputElement);
        if (inputElement) {
          ;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
