import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { UserService } from 'src/app/service/user.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import { CargoUsuario } from 'src/app/interface/cargos-usuario.interface';
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
  isntrainee: boolean= false;
  JobPosition: JobPosition[] = [];
  selectedjobPosition:number | undefined;
  private buildForm(){
    this.form = this.formBuilder.group({
      crg_usr_pret: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      crg_prf: [""],
      crg_elit_id: ["", [Validators.required]],
      disponibilidad: [""],
      tiempo_incorporacion: [""],
      otro_tiempo_incorporacion: [""],
    });
  }
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cargosusuarioService:CargosUsuarioService,
    private JobPositionService:JobPositionService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute ) {
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
      (data: CargoUsuario) => {
        this.form.patchValue(
          {
            crg_usr_pret: data.crg_usr_pret,
            crg_prf: data.crg_prf,
            crg_elit_id: data.jobPosition?.id,
            disponibilidad:data.disponibilidad,
            tiempo_incorporacion:data.tiempo_incorporacion,
            otro_tiempo_incorporacion: data.otro_tiempo_incorporacion,
          }
        )
        /////////////////////////////////////////
     // Asegúrate de que jobPosition esté correctamente asignado
      console.log('jobPosition:', data.jobPosition);
      // Actualizar la variable mostrarFormulario
      if (data.jobPosition?.id !== undefined) {
    //    this.mostrarFormulario = !this.esCargoTrainee(data.jobPosition.id);
      } else {
        // Manejar el caso en el que jobPosition.id es undefined
        this.mostrarFormulario = false; // O el valor que tenga sentido en tu lógica
      }
      ///////////////////////////////////////////
      }
    );
  }
  successMessage() {
    const newCargo: CargoUsuario = this.form.value;
    const usuarioId = newCargo.usuarioId;
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
  esCargoTrainee(){
    const cargoSeleccionado = this.JobPosition.find(position => position.id === Number(this.form.get("crg_elit_id")?.value));
    console.log('cargoSeleccionado:', cargoSeleccionado);
    console.log('cargoSeleccionado id:', this.form.get("crg_elit_id")?.value);
    console.log('cargoSeleccionado name:', this.JobPosition);
    this.isntrainee = !!cargoSeleccionado && !!cargoSeleccionado.name && cargoSeleccionado.name.toLowerCase().includes('trainee');
  }
  //////////////////////////////////////
  submitForm(event: Event){
    event.preventDefault();
  const pretensionRentaFormatted = this.form.get('crg_usr_pret')?.value;
  const pretensionRentaWithoutFormat = pretensionRentaFormatted.replace(/[^\d]/g, '');
  this.form.get('crg_usr_pret')?.setValue(pretensionRentaWithoutFormat);
  const newCargo: CargoUsuario = this.form.value;
  if (newCargo.tiempo_incorporacion !== 'otro') {
    newCargo.otro_tiempo_incorporacion = '';
  }
  newCargo.jobPosition = {
    id: this.form.value.crg_elit_id,
  }
  
  this.cargosusuarioService.guardarCargo(newCargo).subscribe(
    (nuevoCargo: CargoUsuario) => {
      //////////////
     // this.mostrarFormulario = !this.esCargoTrainee(nuevoCargo.jobPosition?.id ?? undefined);
      ////////////////////
    },
    (error) => {
      console.log('Error al guardar herramienta:', error);
    }
  );
  }
  formatCurrency() {
    const control = this.form.get('crg_usr_pret');
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