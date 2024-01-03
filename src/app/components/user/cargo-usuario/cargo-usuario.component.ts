import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { UsuarioService } from 'src/app/service/usuario.service';
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
  JobPosition: JobPosition[] = [];
  selectedjobPosition:number | undefined;
  private buildForm(){
    this.form = this.formBuilder.group({
      crg_usr_pret: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      crg_prf: [""],
      crg_elit_id: ["4", [Validators.required]],
      disponibilidad: [""],
      tiempo_incorporacion: [""],
      otro_tiempo_incorporacion: [""],
    });
  }
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cargosusuarioService:CargosUsuarioService,
    private JobPositionService:JobPositionService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute ) {
      this.buildForm();
    }
  ngOnInit(): void {
    this.getCargoUsuairo();
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
        console.log('Error al obtener niveles:', error);
      }
    );
  }
  getCargoUsuairo() {
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