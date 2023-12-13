import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosElitsoftService } from 'src/app/service/cargos-elitsoft.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interface/user.interface';
import { CargosElitsoft } from 'src/app/interface/cargos-elitsoft.interface';
import { CargoUsuario } from 'src/app/interface/cargos-usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-cargo-usuario',
  templateUrl: './cargo-usuario.component.html',
  styleUrls: ['./cargo-usuario.component.css']
})
export class CargoUsuarioComponent implements OnInit {
  form!: FormGroup;

  cargosElitsoft: CargosElitsoft[] = [];

  selectedCargoElitsoft:number | undefined;


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
    private cargoselitsoftService:CargosElitsoftService, 
    private notification: NotificationService,
    private router: Router, 
    private route: ActivatedRoute ) { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.getCargoUsuairo();
    this.obtenerCargosElitsoft();
  }

  navigateToRoute(route: string) {
    // Navegamos a la ruta proporcionada
    this.router.navigate([route]);
  }

  obtenerCargosElitsoft() {
    this.cargoselitsoftService.obtenerListaCargosElitsoft().subscribe(
      (data: CargosElitsoft[]) => {
        this.cargosElitsoft = data;
        console.log('Cargos cargados:', this.cargosElitsoft);
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
            crg_elit_id: data.cargoElitsoft?.crg_elit_id,
            disponibilidad:data.disponibilidad,
            tiempo_incorporacion:data.tiempo_incorporacion,
            otro_tiempo_incorporacion: "",
          }
        )
      }
    );
  }

  successMessage() {
    const newCargo: CargoUsuario = this.form.value;
  
    // Supongamos que usuarioId está disponible en tu newCargo
    const usuarioId = newCargo.usuarioId;
  
   
  }







  submitForm(event: Event){
    event.preventDefault();
   
  const pretensionRentaFormatted = this.form.get('crg_usr_pret')?.value;
  const pretensionRentaWithoutFormat = pretensionRentaFormatted.replace(/[^\d]/g, '');
  this.form.get('crg_usr_pret')?.setValue(pretensionRentaWithoutFormat);


  const newCargo: CargoUsuario = this.form.value;
  if (newCargo.tiempo_incorporacion !== 'otro') {

    newCargo.tiempo_incorporacion= newCargo.otro_tiempo_incorporacion;
    
    newCargo.otro_tiempo_incorporacion = '';
  }

  newCargo.cargoElitsoft = {
    crg_elit_id: this.form.value.crg_elit_id,
  }

  console.log(newCargo)

  
  this.cargosusuarioService.guardarCargo(newCargo).subscribe(
    (nuevoCargo: CargoUsuario) => {
      console.log('Cargo guardado exitosamente:', nuevoCargo);
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