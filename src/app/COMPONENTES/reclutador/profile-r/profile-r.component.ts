import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  isLoaded: boolean = true;
  usuarioGuardado: Usuario = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_herr: '',
    herr_ver: ''
  };
  router: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private notification: NotificationService
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

  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
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

  toggleEditable() {
    this.editable = !this.editable;
    if (this.editable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
  
  

  async submitForm(event: Event) {
    event.preventDefault();
    const user: Usuario = this.form.value;
    // Guardar los cambios en el servicio
    try {
      await this.usuarioService.updateUsuario(user).toPromise();
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );
      if (isConfirmed) {
        // Redirigir a la página anterior u otra acción
        this.toggleEditable(); // Vuelve a deshabilitar la edición
      }
    } catch (error) {
      // Manejar errores
    }
  }
  

  }