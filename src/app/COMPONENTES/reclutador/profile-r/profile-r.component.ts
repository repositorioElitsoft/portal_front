import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from 'src/app/interface/pais.interface';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { NotificationService } from 'src/app/service/notification.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-profile-r',
  templateUrl: './profile-r.component.html',
  styleUrls: ['./profile-r.component.css']
})
export class ProfileRComponent implements OnInit {
  editable: boolean = false;
  guardadoExitoso: boolean = false; // Nueva variable
  form!: FormGroup;

  countries: Pais[] = [];
  isLoaded: boolean = true;

  usuarioGuardado: Usuario = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_herr: '',
    herr_ver: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usr_nom: ["", [Validators.required]],
      usr_ap_pat: ["", [Validators.required]],
      usr_ap_mat: ["", [Validators.required]],
      usr_email: [""],
    });
  }

  // Método para habilitar/deshabilitar la edición
  toggleEditable() {
    this.editable = !this.editable;
    if (this.editable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
  }

  navigateToRoute(route: string) {
    // Navegamos a la ruta proporcionada
    this.router.navigate([route]);
  }

  ObtenerUsuarioGuardado() {
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        this.form.patchValue({
          usr_nom: this.usuarioGuardado.usr_nom,
          usr_ap_pat: this.usuarioGuardado.usr_ap_pat,
          usr_ap_mat: this.usuarioGuardado.usr_ap_mat,
          usr_email: this.usuarioGuardado.usr_email,
        });
        this.isLoaded = true;
        const inputElement = document.getElementById("inputTelefono");
        if (inputElement) {
          intlTelInput(inputElement, {
            initialCountry: "cl",
            separateDialCode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            placeholderNumberType: "UNKNOWN",
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
  
    try {
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );
  
      if (isConfirmed) {
        await this.usuarioService.updateUsuario(user).toPromise();
        this.guardadoExitoso = true; // Marcar como guardado exitoso
        this.router.navigate(['/reclutador/profile-r']);
      }
    } catch (error) {
      this.guardadoExitoso = false; // Marcar como no guardado exitoso
    }
  }
}