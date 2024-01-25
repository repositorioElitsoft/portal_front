import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { UserJobService} from 'src/app/service/user-job.service';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import Swal from 'sweetalert2';
import { UserJob } from 'src/app/interface/user-job.interface';

@Component({
  selector: 'app-add-position-user',
  templateUrl: './add-position-user.component.html',
  styleUrls: ['./add-position-user.component.css']
})
export class AddPositionUserComponent implements OnInit {
  @Output()  AddPositionUserComponent: EventEmitter<void> = new EventEmitter<void>();
  form!: FormGroup;
  mostrarFormulario: boolean = true;
  istrainee: boolean = false;
  JobPosition: JobPosition[] = [];
  creationMode = true;
  selectedCargo: JobPosition | undefined;
  selectedjobPosition: number | undefined;
  shouldSaveCargo: boolean = true;
  redirectingToReferencias: boolean = false;



  private buildForm() {
    this.form = this.formBuilder.group({
      salary: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      JobPositionId: ["", [Validators.required]],
      // Agrega un campo para el nombre del cargo bloqueado
      jobPositionName: [""], // No es necesario agregar Validators a este campo
      availability: this.formBuilder.group({
        id: ['1'],
        time: ['']
      }),
    });
  }

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cargosusuarioService: UserJobService,
    private JobPositionService: JobPositionService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerJobPosition();
    this.form.patchValue(this.data.userJob);
    if (this.data.userJob) {
      this.form.patchValue(this.data.userJob);
      this.form.get('JobPositionId')?.patchValue(this.data.userJob.jobPosition?.id);
      this.creationMode = !this.data.userJob.id;

      // Si estás en modo edición, asigna el nombre del cargo bloqueado
      if (!this.creationMode) {
        const selectedCargoName = this.data.userJob.jobPosition?.name;
        this.form.get('jobPositionName')?.setValue(selectedCargoName);
      }
    }
  }

    
    
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  obtenerJobPosition() {
    this.JobPositionService.obtenerListaJobPosition().subscribe(
      (data: JobPosition[]) => {
        this.JobPosition = data;
      },
      (error) => {
        console.log('Error al obtener el cargo de elitsoft:', error);
      }
    );
  }

  successMessage() {
    const newCargo: UserJob = this.form.value;
    const usuarioId = newCargo.user;
    Swal.fire({
      icon: 'success',
      title: 'Datos enviados exitosamente',
      text: 'Gracias por postular en Elitsoft',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border' 
      }
    });
  }
  redirectToReferencias() {
    this.shouldSaveCargo = false; 
    this.dialog.closeAll()
    this.router.navigate(['/user/informacion-academica']);
  }
  esCargoTrainee(){
    const cargoSeleccionado = this.JobPosition.find(position => position.id === Number(this.form.get("JobPositionId")?.value));
    console.log('cargoSeleccionado:', cargoSeleccionado);
    console.log('cargoSeleccionado id:', this.form.get("JobPositionId")?.value);
    console.log('cargoSeleccionado name:', this.JobPosition);
    this.istrainee = !!cargoSeleccionado && !!cargoSeleccionado.name && cargoSeleccionado.name.toLowerCase().includes('trainee');
  }
  submitForm(event: Event) {
    event.preventDefault();
    if (this.shouldSaveCargo) {
      const pretensionRentaFormatted = this.form.get('salary')?.value;
      const pretensionRentaWithoutFormat = pretensionRentaFormatted.replace(/[^\d]/g, '');
      this.form.get('salary')?.setValue(pretensionRentaWithoutFormat);
      const newCargo: UserJob = this.form.value;
  
      newCargo.jobPosition = {
        id: this.form.value.JobPositionId,
      }
  
      if (this.data.userJob?.id) {
        console.log('ID existente en data:', this.data.userJob.id);
        newCargo.id = this.data.userJob.id;
      } else {
        console.log('Creando un nuevo registro');
      }
      console.log('Datos a guardar:', newCargo);
  
      this.cargosusuarioService.guardarCargo(newCargo).subscribe(
        (nuevoCargo: UserJob) => {
          this.postSubmit(); 
        },
        (error) => {
          console.log('Error al guardar postulación:', error);
        }
      );
    } else {
      this.shouldSaveCargo = true; // Restablece el valor para futuros envíos
    }
  }
  

  postSubmit() {
    this.successMessage();
    this.dialog.closeAll();
  }
  

 
  
  formatCurrency() {
    const control = this.form.get('salary');
    if (control && control.value) {
      let value = control.value.toString();
      value = value.replace(/[^0-9]/g, '');
      const formattedValue = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
      }).format(Number(value));
      control.setValue(formattedValue);
    }
  }


  onJobPositionChange(event: any) {
    if (!this.creationMode) {
      const selectedCargoId = this.data.userJob.jobPosition?.id;
      const selectedCargo = this.JobPosition.find(cargo => cargo.id === selectedCargoId);
      this.form.get('jobPositionName')?.setValue(selectedCargo?.name);
    }
  }
}