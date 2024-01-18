import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserJobAvailability } from 'src/app/interface/user-job-availability.interface';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-availability',
  templateUrl: './user-availability.component.html',
  styleUrls: ['./user-availability.component.css']
})
export class UserAvailabilityComponent {
  @ViewChild('timeSelect') timeSelect!: MatSelect;
  form: FormGroup;
  user: any[] = [];
  isEditMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data.user) {
      this.isEditMode = true;
      this.form.patchValue(this.data.user);
    } else {
      this.isEditMode = false;
    }

    if (typeof this.data.creationMode === 'boolean') {
      this.isEditMode = !this.data.creationMode; // Si creationMode es `true`, cambia a modo edición
    }
    console.log('creation mode:  ', this.isEditMode);
  }

  campoTieneErrores(campo: string) {
    const control = this.form.get(campo);
    return control?.hasError('required') && control.touched;
  }

  submitForm() {
    if (this.form.valid) {
      // El formulario es válido, puedes enviar los datos

      this.userService.updateAvailability(this.form.value).subscribe(
        (result) => {
          Swal.fire({
            title: 'Éxito',
            text: 'La disponibilidad se ha actualizado correctamente',
            icon: 'success',
            confirmButtonColor: '#F57C27',
            customClass: {
              popup: 'custom-border'
            }
          });
          this.dialog.closeAll();
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Se produjo un error al actualizar la disponibilidad',
            icon: 'error',
            customClass: {
              container: 'custom-swal' // Aplica la clase CSS personalizada aquí
            }
          });
        }
      );
    } else {

      this.snackBar.open('Debe seleccionar una opción válida', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}

