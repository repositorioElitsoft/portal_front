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
      crg_usr_pret: ["",[Validators.required,Validators.pattern("^[0-9]+$")]],
      crg_prf: ["",[]],
      crg_elit_id: ["4",[Validators.required]],
    });
  }

  constructor(private usuarioService: UsuarioService, 
    private formBuilder: FormBuilder,
    private cargosusuarioService:CargosUsuarioService, private cargoselitsoftService:CargosElitsoftService, 
    private notification: NotificationService,
    private router: Router, private route: ActivatedRoute ) { 
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
            crg_elit_id: data.cargoElitsoft.crg_elit_id,
          }
        )
      }
    );
  }

  successMessage(){
    this.notification.showNotification(
      'success',
      'Éxito',
      'Tus datos han sido guardados correctamente, te contactaremos a la brevedad.'
    )
  }

  submitForm(event: Event){
    event.preventDefault();

  
  const newCargo: CargoUsuario = this.form.value;

  // Completamos los datos del cargo con las selecciones
  newCargo.cargoElitsoft = {
    crg_elit_id: this.form.value.crg_elit_id,
  }

  console.log(newCargo)

  // Llamamos al servicio para guardar el cargo
  this.cargosusuarioService.guardarCargo(newCargo).subscribe(
    (nuevoCargo: CargoUsuario) => {
      console.log('Cargo guardado exitosamente:', nuevoCargo);
      // Puedes redirigir al usuario a otra página o realizar alguna otra acción después de guardar.
    },
    (error) => {
      console.log('Error al guardar herramienta:', error);
    }
  );
  }
}
