import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-preffered-job',
  templateUrl: './user-preffered-job.component.html',
  styleUrls: ['./user-preffered-job.component.css']
})
export class UserPrefferedJobComponent {
  form: FormGroup;
  userPreferredJob: any[] = [];
  dataReceived: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.patchValue(this.data.userPreferredJob);
    console.log('esto trae this.data', this.data);
    this.loadPreferredJobs();
    this.data.creationMode;
    console.log('creation mode:  ', this.data.creationMode)
  }
  

  campoTieneErrores(campo: string) {
    const control = this.form.get(campo);
    return control?.hasError('required') && control?.touched;
  }


  createOrUpdatePreferredJob() {
    const userPreferredJobData = this.form.value;
    if (this.data.creationMode) {
      this.userService.createOrUpdatePreferredJob(userPreferredJobData).subscribe((response: any) => {
        this.loadPreferredJobs();
      });
    } else {
      console.log('Solo se permite editar el cargo preferente actual.');
    }
  }

  loadPreferredJobs() {
    this.userService.getPreferredJob().subscribe((data: any) => {
      if (data && data.length > 0) {
        // Si hay datos, establece el modo de edición
        this.userPreferredJob = data;
        this.dataReceived = true;
      } else {
   
      }
    });
  }
  

  submitForm() {
    const userPreferredJobData = this.form.value;
    if (this.data.creationMode) {
      this.userService.createOrUpdatePreferredJob(userPreferredJobData).subscribe((response: any) => {  Swal.fire({
        title: 'Éxito',
        text: 'Se ha enviado con éxito su cargo preferente',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#F57C27',
        icon: 'success', customClass: {
          popup: 'custom-border' 
        }
      });
        this.loadPreferredJobs();
        this.dialog.closeAll();
      });
    } else {
      this.userService.createOrUpdatePreferredJob(userPreferredJobData).subscribe((response: any) => {
        Swal.fire({
          title: 'Éxito',
          text: 'Se ha actualizado con éxito su cargo preferente',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F57C27',
          icon: 'success', customClass: {
            popup: 'custom-border' 
          }
        });
        this.loadPreferredJobs();
        this.dialog.closeAll();
      });
    }
  
}}
