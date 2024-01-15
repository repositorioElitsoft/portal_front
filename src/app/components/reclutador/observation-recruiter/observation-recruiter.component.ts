import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observation } from 'src/app/interface/observation.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserJobService } from 'src/app/service/user-job.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-observation-recruiter',
  templateUrl: './observation-recruiter.component.html',
  styleUrls: ['./observation-recruiter.component.css']
})
export class ObservationRecruiterComponent implements OnInit {
  usuarioData: any;
  nuevaObservacion: Observation = {
    obs_id: 0,
    description: '',
    userJob: {
      fecha: '',
      user: {
        name: '',
        email: '',
        address: ''
      },
      id: 0,
      salary: 0,
      applicationDate: new Date(),
      approvals: undefined
    },
    updates: []
  };

  constructor(
    private userService: UserService,
    private userjobservice: UserJobService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioData = [];
  }

  ngOnInit(): void {
    this.usuarioData = this.data.usuario;
    console.log('Esta es la data recibida por el hijo:', this.usuarioData);
  
    // Verifica si el usuarioData no tiene un ID y asigna "nueva" como ID predeterminado
    if (this.usuarioData && this.usuarioData.userJob && this.usuarioData.userJob.id == null) {
      this.usuarioData.userJob.id = "nueva";
    }
  }
  

  submitForm() {
    console.log('Datos que se enviarán al servidor:', this.nuevaObservacion);
  
    if (this.nuevaObservacion.obs_id === 0) {
      // Si el ID es 0, crear una nueva observación
      this.observacionService.crearObservacion(this.nuevaObservacion).subscribe(
        (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Nueva observación creada con éxito:', response);
        },
        (error) => {
          console.error('Error al crear la nueva observación:', error);
        }
      );
    } else {
      // Si el ID no es 0, actualizar la observación existente
      this.observacionService.actualizarObservacion(this.nuevaObservacion.obs_id, this.nuevaObservacion).subscribe(
        (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Observación actualizada con éxito:', response);
        },
        (error) => {
          // Manejar errores aquí
          console.error('Error al actualizar la observación:', error);
        }
      );
    }
  }
  
  
}
