import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observation } from 'src/app/interface/observation.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserJobService } from 'src/app/service/user-job.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-observation-recruiter-edit',
  templateUrl: './observation-recruiter-edit.component.html',
  styleUrls: ['./observation-recruiter-edit.component.css']
})
export class ObservationRecruiterEditComponent implements OnInit {
  usuarioData: any;
  formulario!: FormGroup;
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
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioData = [];
    this.createForm();
  }

  ngOnInit(): void {
    this.usuarioData = this.data.usuario;
    console.log('esta es la id observacion: ', this.data.usuario[0])
    this.formulario.get('userJob')?.get('id')?.patchValue(this.data.usuario[0]?.id || null);
    if (this.usuarioData && this.usuarioData.userJob && this.usuarioData.userJob.id == null) {
      this.usuarioData.userJob.id = "nueva";
    }
  }

  createForm() {
    this.formulario = this.formbuilder.group({
      description: ['', Validators.required],
      userJob: this.formbuilder.group({
        id: [null, Validators.required]
      })
    });
  }
  

  submitForm() {
    this.nuevaObservacion.description = this.formulario.get('description')?.value;
    this.nuevaObservacion.userJob.id = this.formulario.get('userJob.id')?.value;
  
    console.log('Datos que se enviarán al servidor:', this.nuevaObservacion);
  
    if (this.nuevaObservacion.obs_id === 0) {
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
