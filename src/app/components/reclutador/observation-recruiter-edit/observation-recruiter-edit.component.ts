import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
 

  constructor(
    private dialogRef: MatDialogRef<ObservationRecruiterEditComponent>,   
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
    console.log('data de llegada al componente hijo: ', this.data)
    console.log('data de llegada al componente hijo: ', this.data.observationId )

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
    const nuevaDescripcion = this.formulario.get('description')?.value;
  
    if (this.data.observationId !== 0) {
      // Actualizar la observación existente si observationId no es 0
      this.observacionService.actualizarObservacion(this.data.observationId, {
        description: nuevaDescripcion,
        userJob: this.data.userJob,
        obs_id: this.data.observationId,
        updates: []
      }).subscribe(
        (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Observación actualizada con éxito:', response);
  
          // Cerrar el diálogo
          this.dialogRef.close();
  
          // Mostrar un MatSnackBar con el mensaje de actualización exitosa
          this._snackBar.open('La observación se ha actualizado con éxito', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
          });
        },
        (error) => {
          // Manejar errores aquí
          console.error('Error al actualizar la observación:', error);
        }
      );
    } else {
      console.error('No se puede actualizar una observación sin ID válido.');
      // Manejar el caso de que no haya un ID válido para la observación
    }
  }
  
  
}
