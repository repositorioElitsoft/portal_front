import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { Pais } from 'src/app/interface/pais.interface';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { NotificationService } from 'src/app/service/notification.service';
import { PaisService } from 'src/app/service/pais.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form!: FormGroup;
  currentResumeName?: string = "";
  usuarioId: number= 0;
  countries: Pais[] = [];
  isLoaded: boolean = true;
  isUploadingFile: boolean = false;

  usuarioGuardado: Usuario = {
    usr_id:0,
    usr_rut: '',
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
    laborales: [],
    cargoUsuario: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private paisService: PaisService,
    private snackBar: MatSnackBar,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usr_rut: ["", [Validators.required, rutValido]],
      usr_nom: ["", [Validators.required]],
      usr_ap_pat: ["", [Validators.required]],
      usr_ap_mat: ["", [Validators.required]],
      pais: ["1", [Validators.required]],
      usr_url_link: ["", []],
      usr_tel: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
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
    this.router.navigate([route]);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const srcResult = e.target.result;
        console.log("result: ", srcResult);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);

      const formData: FormData = new FormData();
      formData.append('file', inputNode.files[0]);

      this.isUploadingFile = true;
      this.usuarioService.actualizarCV(formData).subscribe({
        next: (response) => {
          console.log("Subido con éxito:", inputNode.files[0].fileName, response);
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
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        console.log(this.usuarioGuardado);
        this.currentResumeName = data.cvPath?.substring(37, data.cvPath.length);

        this.form.patchValue({
          usr_rut: this.usuarioGuardado.usr_rut,
          usr_nom: this.usuarioGuardado.usr_nom,
          usr_ap_pat: this.usuarioGuardado.usr_ap_pat,
          usr_ap_mat: this.usuarioGuardado.usr_ap_mat,
          pais: this.usuarioGuardado.pais?.pais_id,
          usr_url_link: this.usuarioGuardado.usr_url_link,
          usr_tel: this.usuarioGuardado.usr_tel,
        });

        this.isLoaded = true;
        const inputElement = document.getElementById("inputTelefono");
        console.log(inputElement);
        if (inputElement) {
          intlTelInput(inputElement, {
            initialCountry: "cl",
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            placeholderNumberType: "UNKNOWN"
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async submitForm(event: Event) {
    event.preventDefault();

    const user: Usuario = this.form.value;

    console.log(user);

    user.pais = {
      pais_id: this.form.value.pais,
      pais_nom: ""
    };

    console.log(user);
    try {
      await this.usuarioService.updateUsuario(user).toPromise();
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );

      if (isConfirmed) {
        this.router.navigate(['/reclutador']);
      }
    } catch (error) {
      console.error(error);
    }
  }


  borrarCV() {
    if (this.usuarioGuardado?.usr_id){
    this.usuarioService.borrarCV(this.usuarioGuardado.usr_id).subscribe({
      next: () => {
        console.log('CV eliminado con éxito');
        this.currentResumeName = undefined;
      },
      error: (err) => {
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