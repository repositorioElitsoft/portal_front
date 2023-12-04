import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observacion } from 'src/app/interface/observacion.interface';
import { Usuario } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaobservacionService } from 'src/app/service/categoriaobservacion.service';
import { ObservacionService } from 'src/app/service/observacion.service';
@Component({
  selector: 'app-add-observacion',
  templateUrl: './add-observacion.component.html',
  styleUrls: ['./add-observacion.component.css']
})
export class AddObservacionComponent implements OnInit {

  nuevaObservacion: Observacion = {
    obs_id: 0, // Asigna un valor predeterminado para obs_id, según tu lógica
    obs_desc: '',
    obs_fec_cre: new Date(),
    obs_fec_mod: new Date(),
    apr_oper: '',
    apr_tec: '',
    apr_ger: '',
    usuario:  {} as Usuario ,
    usr_id_obs: 0,
    usr_id_obs_mod: 0,
    categoriaObservacion: {
      cat_obs_id: 0,
      cat_obs_desc: '',
    }
  };

  categorias: any[] = [];
  usr_id: number; // Variable para almacenar usr_id
  usr_id_sesion: number; // Variable para almacenar usr_id_sesion

  constructor(private observacionService:ObservacionService, private categoriaObservacionService:CategoriaobservacionService, private authService: AuthService, public dialogRef: MatDialogRef<AddObservacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any){

    this.usr_id = data.usuarioId; // Obtener usr_id del usuario al que se asignará la observación
    this.usr_id_sesion = data.usr_id_sesion; // Obtener usr_id_sesion de los datos del diálogo
  }

  guardarObservacion() {
    const usuarioId = this.data.usuarioId;
    const usrIdSesion = this.authService.getUserId();

    // Asigna el usuarioId a la observación
    this.nuevaObservacion.usuario.usr_id = usuarioId;
    this.nuevaObservacion.usr_id_obs = usrIdSesion ? usrIdSesion : 0;
    this.nuevaObservacion.usr_id_obs_mod = usrIdSesion ? usrIdSesion : 0;

    // Llama al método del servicio para guardar la observación
    this.observacionService.guardarObservacionCat(
      this.nuevaObservacion,
      usuarioId,
      this.nuevaObservacion.categoriaObservacion.cat_obs_id,
      this.nuevaObservacion.usr_id_obs,
      this.nuevaObservacion.usr_id_obs_mod
    ).subscribe(
      (resultado: boolean) => {
        if (resultado) {
          console.log('Observación guardada exitosamente');
        } else {
          console.error('Error al guardar la observación');
        }
      },
      (error: any) => {
        console.error('Error al guardar la observación', error);
      }
    );

    // Cierra el diálogo
    this.dialogRef.close(this.nuevaObservacion);
  }

  ngOnInit(): void {

    this.nuevaObservacion.usr_id_obs = this.usr_id_sesion;
    this.nuevaObservacion.usr_id_obs_mod = this.usr_id_sesion;
    this.categoriaObservacionService.getCategorias().subscribe(
      (categorias: any[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );

  }
}
