import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { Pais } from 'src/app/interface/pais.interface';
import { FormBuilder,FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { NotificationService } from 'src/app/service/notification.service';
import { PaisService } from 'src/app/service/pais.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form!: FormGroup;


  countries: Pais[] = [];
  isLoaded: boolean = true

  usuarioGuardado:Usuario={
    usr_rut: '' ,
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_pass: '',
    usr_tel: '',
    usr_url_link: '',
    pais: {
      pais_id: undefined,
      pais_nom: ''
    },
    pais_nom: '',
    usr_herr: '',
    herr_ver: '',
    herr_exp: '',
    laborales: []
  };

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private paisService: PaisService,
    private toastr:ToastrService,
    private notification: NotificationService,
    private route: ActivatedRoute)
    {
      this.buildForm();
    }

  private buildForm(){
    this.form = this.formBuilder.group({
      usr_rut: ["",[Validators.required, rutValido]],
      usr_nom: ["",[Validators.required]],
      usr_ap_pat: ["",[Validators.required]],
      usr_ap_mat: ["",[Validators.required]],
      pais: ["1",[Validators.required]],
      usr_url_link: ["",[]],
      usr_tel: ["",[Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  ngOnInit(): void {
  

    this.paisService.obtenerPaises().subscribe(
      (data: any[]) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
    this.ObtenerUsuarioGuardado();
  }

  navigateToRoute(route: string) {
    // Navegamos a la ruta proporcionada
    this.router.navigate([route]);
  }


  ObtenerUsuarioGuardado(){
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
      next: (data) =>{
        this.usuarioGuardado = data;
        console.log(this.usuarioGuardado)
        this.form.patchValue({

          usr_rut: this.usuarioGuardado.usr_rut,
          usr_nom: this.usuarioGuardado.usr_nom,
          usr_ap_pat: this.usuarioGuardado.usr_ap_pat,
          usr_ap_mat: this.usuarioGuardado.usr_ap_mat,
          pais: this.usuarioGuardado.pais?.pais_id,
          usr_url_link: this.usuarioGuardado.usr_url_link,
          usr_tel: this.usuarioGuardado.usr_tel,

        })
        this.isLoaded= true;
        const inputElement = document.getElementById("inputTelefono");
        console.log(inputElement)
        if(inputElement){
          intlTelInput(inputElement,{
            initialCountry: "cl",
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            placeholderNumberType: "UNKNOWN"
          })
        }
      },
      error: (err)=>{
        console.log(err)

      }
    })

  }

  async submitForm(event: Event) {
    event.preventDefault();

    const user: Usuario = this.form.value;

    console.log(user);

    user.pais = {
      pais_id: this.form.value.pais,
      pais_nom: ""
    }

    console.log(user);
    try{
      this.usuarioService.updateUsuario(user).toPromise()
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );

      if (isConfirmed) {
        this.router.navigate(['/reclutador']);
      }
    } catch (error) {

    }

    /*
    this.paisService.obtenerPaisPorNombre(this.usuarioNuevo.pais_nom).subscribe(
      (pais: Pais) => {
        // Asignar el objeto Pais al usuarioNuevo
        this.usuarioNuevo.pais = pais;

        // Llamar al servicio UsuarioService para guardar el usuario
        this.usuarioService.saveUsuario(this.usuarioNuevo).subscribe(
          (res: any) => {
            console.log(res);
            this.toastr.success('Datos personales guardados');
            // Navegar a la página de Herramientas y Tecnologías y pasar el id de usuario como query parameter
            this.router.navigate(['/herramientas-tecnologias'], {
              relativeTo: this.route,
              queryParams: { usr_id: res.usr_id }
            });
          },
          (err: any) => console.log(err)
        );
      },
      (err: any) => console.log(err)
    );*/

  }






}

function rutValido(control: AbstractControl): ValidationErrors | null {

  if(!control.value.includes("-")){
    return {badRut : true}
  }

  if (control.value && !validarRut(control.value)) {
    // Validation failed, return an error object
    return { badRut: true };
  }
  return null;
}

function validarRut(rut: string) {
  // Eliminar espacios y guiones del RUT
  rut = rut.replace(/\s+/g, '').replace(/-/g, '');

  // Verificar que el RUT tenga el formato correcto
  if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) {
    return false;
  }

  // Separar el número de identificación y el dígito verificador
  const numero = rut.slice(0, -1);
  const dv = rut.slice(-1).toUpperCase();

  // Calcular el dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  for (let i = numero.length - 1; i >= 0; i--) {
    suma += multiplicador * parseInt(numero.charAt(i), 10);
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);

  // Comparar el dígito verificador calculado con el dígito verificador del RUT
  if ((dvEsperado === 11 && dv === '0') || (dvEsperado === 10 && dv.toUpperCase() === 'K') || dvEsperado === parseInt(dv, 10)) {
    return true;
  }

  return false;
}
