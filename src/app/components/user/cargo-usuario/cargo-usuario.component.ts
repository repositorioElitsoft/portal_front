import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { UserService } from 'src/app/service/user.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import { UserJob } from 'src/app/interface/user-job.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cargo-usuario',
  templateUrl: './cargo-usuario.component.html',
  styleUrls: ['./cargo-usuario.component.css']
})
export class CargoUsuarioComponent implements OnInit {
  form!: FormGroup;
  mostrarFormulario: boolean = true;
  isntrainee: boolean = false;
  JobPosition: JobPosition[] = [];
  selectedjobPosition: number | undefined;
  private buildForm() {
    this.form = this.formBuilder.group({
      salary: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      JobPositionId: ["", [Validators.required]],
      // availability: ["", [Validators.required]],
      availability: this.formBuilder.group({
        id: ['1',],
        time: ['',]
      }),
    });
  }
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cargosusuarioService: CargosUsuarioService,
    private JobPositionService: JobPositionService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.getCargoUsuario();
    this.obtenerJobPosition();
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
  getCargoUsuario() {
    this.cargosusuarioService.getCargosByUserId().subscribe(
      (data: UserJob) => {
        this.form.patchValue(
          {
            salary: data.salary,
            JobPositionId: data.jobPosition?.id,
            availability: data.availability?.id,

          }
        )
        /////////////////////////////////////////
        // Asegúrate de que jobPosition esté correctamente asignado
        console.log('jobPosition:', data.jobPosition);
        // Actualizar la variable mostrarFormulario
        if (data.jobPosition?.id !== undefined) {
          //    this.mostrarFormulario = !this.esCargoTrainee(data.jobPosition.id);
          this.mostrarFormulario = true;
        } else {
          console.log("Mostar formulario es false ahora")
          // Manejar el caso en el que jobPosition.id es undefined
          this.mostrarFormulario = true; // O el valor que tenga sentido en tu lógica
        }
        ///////////////////////////////////////////
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
    this.router.navigate(['/user/informacion-academica']);
  }
  ///////////////////////////////////////////
  esCargoTrainee() {
    const cargoSeleccionado = this.JobPosition.find(position => position.id === Number(this.form.get("JobPositionId")?.value));
    console.log('cargoSeleccionado:', cargoSeleccionado);
    console.log('cargoSeleccionado id:', this.form.get("JobPositionId")?.value);
    console.log('cargoSeleccionado name:', this.JobPosition);
    this.isntrainee = !!cargoSeleccionado && !!cargoSeleccionado.name && cargoSeleccionado.name.toLowerCase().includes('trainee');
  }
  //////////////////////////////////////
  submitForm(event: Event) {
    event.preventDefault();
    const pretensionRentaFormatted = this.form.get('salary')?.value;
    const pretensionRentaWithoutFormat = pretensionRentaFormatted.replace(/[^\d]/g, '');
    this.form.get('salary')?.setValue(pretensionRentaWithoutFormat);
    const newCargo: UserJob = this.form.value;

    newCargo.jobPosition = {
      id: this.form.value.JobPositionId,
    }
    console.log('new cargo:', newCargo);
    this.cargosusuarioService.guardarCargo(newCargo).subscribe(
      (nuevoCargo: UserJob) => {
        //////////////
        // this.mostrarFormulario = !this.esCargoTrainee(nuevoCargo.jobPosition?.id ?? undefined);
        ////////////////////
      },
      (error) => {
        console.log('Error al guardar postulación:', error);
      }
    );
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
}