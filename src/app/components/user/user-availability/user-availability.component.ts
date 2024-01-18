import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.patchValue(this.data.user);
    console.log('esto trae this.data', this.data);
    console.log('creation mode:  ', this.data.creationMode)
  }

  campoTieneErrores(campo: string) {
    const control = this.form.get(campo);
    return control?.hasError('required') && control.touched;
  }

  submitForm() {


    this.userService.updateAvailability(this.form.value).subscribe(
      (result) => {
        Swal.fire('Éxito', 'La disponibilidad se ha actualizado correctamente', 'success');
        this.dialog.closeAll();
      },
      (error) => {
        Swal.fire('Error', 'Se produjo un error al actualizar la disponibilidad', 'error');
      }
    );
  }

}
