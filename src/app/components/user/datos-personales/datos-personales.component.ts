import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { NotificationService } from 'src/app/service/notification.service';


import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/interface/state.interface';
import { City } from 'src/app/interface/city.interface';
import { CityService } from 'src/app/service/city.service';
import { CountryService } from 'src/app/service/country.service';
import { StateService } from 'src/app/service/state.service';
import { Country } from 'src/app/interface/country.interface';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form!: FormGroup;
  currentResumeName?: string = "";
  countries: Country[] = [];
  states: State[] = []; 
  cities: City[] = []; 
  isLoaded: boolean = true
  isUploadingFile: boolean = false
  usuarioGuardado!: User

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private snackBar: MatSnackBar,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      rut: ["",[Validators.required, rutValido]],
      name: ["",[Validators.required]],
      firstLastname: ["",[Validators.required]],
      secondLastname: ["",[Validators.required]],
      country: ["1", [Validators.required]],
      state: ["", [Validators.required]],
      city: this.formBuilder.group({
        id:['', Validators.required]
      }),
      address:["", Validators.required],
      linkedin: ["",[]],
      phone: ["",[Validators.required, Validators.pattern("^[0-9]+$")]],
      usr_gen:["Masculino", [Validators.required]],
      usr_gen_otro: ["", [Validators.required]]
    });

  this.form.get('usr_gen')?.valueChanges.subscribe((value) => {
    if (value === 'Otro') {
      this.form.get('usr_gen_otro')?.setValidators([Validators.required]);
    } else {
      this.form.get('usr_gen_otro')?.setValidators(null);
      this.form.get('usr_gen_otro')?.setValue('');
    }
    this.form.get('usr_gen_otro')?.updateValueAndValidity();
  });
  }

  onCountrySelected(){
    const countryId = this.form.get("country")!.value;
    this.stateService.obtenerEstadosporCountry(countryId).subscribe({
      next: (data:State[]) => {
        this.states = this.sortByName(data);
      },
      error: (error) => {
        console.error('Error fetching states:', error);
      }
    });
  }
  onStateSelected(){

    const stateId = this.form.get("state")!.value;
    this.cityService.getStateByCountry(stateId).subscribe({
      next: (data:City[]) => {
        this.cities = this.sortByName(data);
      },
      error: (error) => {
        console.error('Error fetching states:', error);
      }
    });
  }
  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
  }
   obtenerEstadosporCountry(countryId: number) {
    this.stateService.obtenerEstadosporCountry(countryId).subscribe(
      (data: State[]) => {
        this.states = this.sortByName(data);
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }
  cargarCiudadesPorEstado(estadoId: number) {
    this.cityService.obtenerCiudadesPorEstado(estadoId).subscribe(
      (data: City[]) => {
        this.cities = this.sortByName(data);
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  private sortByName(data: any): any[] {
    if (Array.isArray(data)) {
      return data.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (data && Array.isArray(data.states)) {
      return data.states.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else {
      console.error('Error: Unable to sort data.');
      return [];
    }
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
      const formData: FormData = new FormData();
      formData.append('file', inputNode.files[0]);
      this.isUploadingFile = true
      this.userService.actualizarCV(formData).subscribe({
        next: (response) => {
          this.isUploadingFile = false;
          this.currentResumeName = inputNode.files[0].name;
        },
        error: (err) => {
          console.log("Error al actualizar CV:", err);
          this.snackBar.open("Error al actualizar CV", "Ok", {
            duration: 3000,
          });
          this.isUploadingFile = false;
        }
      });
    }
  }
   ObtenerUsuarioGuardado() {
    this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        this.usuarioGuardado = data;
        this.currentResumeName = data.cvPath?.substring(37,data.cvPath.length)
        this.form.patchValue(data);
        /*
        this.form.get('usr_gen')?.setValue(this.usuarioGuardado.usr_gen)

        if (this.usuarioGuardado.usr_gen === 'Otro') {
          this.form.get('usr_gen')?.setValue('Otro');
        }*/

        this.isLoaded= true;
        const inputElement = document.getElementById("inputTelefono");
        if (inputElement) {
          intlTelInput(inputElement, {
            initialCountry: "cl",
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            placeholderNumberType: "UNKNOWN"
          });
        }
        this.countryService.obtenerPaises().subscribe({
          next: (data: Country[]) => {
            this.countries = this.sortByName(data);
            this.form.get('country')?.patchValue(this.usuarioGuardado.city?.state?.country?.id)
            this.stateService.obtenerEstadosporCountry(this.usuarioGuardado.city?.state?.country?.id ?? 0).subscribe(
              (data: State[]) => {
                this.states = this.sortByName(data);
                this.form.get('state')?.patchValue(this.usuarioGuardado.city?.state?.id)
                this.cityService.getStateByCountry(this.usuarioGuardado.city?.state?.id ?? 0).subscribe({
                  next: (data:City[]) => {
                    this.cities = this.sortByName(data);
                    this.form.get('city')?.get('id')?.patchValue(this.usuarioGuardado.city?.id)
                  },
                  error: (error) => {
                    console.error('Error fetching states:', error);
                  }
                });
              },
              (error) => {
                console.error('Error fetching states:', error);
              }
            );
          },
          error: (error) => {
            console.error('Error fetching countries:', error);
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  async submitForm(event: Event) {
    event.preventDefault();
    const user: User = this.form.value;

    try {
      /*
      await this.userService.updateUsuario(user).toPromise();*/
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );
      if (isConfirmed) {
        this.router.navigate(['/user/herramientas-tecnologias']);
      }
    } catch (error) {
      console.error(error);
    }
  }
  borrarCV() {
    if (this.usuarioGuardado?.id){
    this.userService.borrarCV(this.usuarioGuardado.id).subscribe({
      next: () => {
        this.currentResumeName = undefined;
      },
      error: (err: any) => {
        console.error('Error al eliminar CV:', err);
      },
    });
  }
  }
}
function rutValido(control: AbstractControl): ValidationErrors | null {
  if (!control.value.includes("-")) {
    return { badRut: true };
  }
  if (control.value && !validarRut(control.value)) {
    return { badRut: true };
  }
  return null;
}
function validarRut(rut: string) {
  rut = rut.replace(/\s+/g, '').replace(/-/g, '');
  if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) {
    return false;
  }
  const numero = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();
  let suma = 0;
  let multiplicador = 2;
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += multiplicador * parseInt(numero.charAt(i), 10);
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }
  const dvEsperado = 11 - (suma % 11);
  if ((dvEsperado === 11 && dv === '0') || (dvEsperado === 10 && dv.toUpperCase() === 'K') || dvEsperado === parseInt(dv, 10)) {
    return true;
  }
  return false;
}