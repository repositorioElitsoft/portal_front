import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  editable: boolean = false;
  form!: FormGroup;
  isLoaded: boolean = true;
  usuarioGuardado!: User;
  router: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      firstLastname: ["", [Validators.required]],
      secondLastname: ["", [Validators.required]],
      email: [""],
    });
  }
  ngOnInit(): void {
    this.ObtenerUsuarioGuardado();
    this.form.disable();
  }
  ObtenerUsuarioGuardado() {
    this.userService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        this.form.patchValue({
          name: this.usuarioGuardado.name,
          firstLastname: this.usuarioGuardado.firstLastname,
          secondLastname: this.usuarioGuardado.secondLastname,
          email: this.usuarioGuardado.email,
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
    const user: User = this.form.value;
    console.log(user)
    try {
      await this.userService.updateUsuario(user).toPromise();
      const isConfirmed = await this.notification.showNotification(
        "success",
        "Datos guardados",
        "Datos actualizados correctamente"
      );
      if (isConfirmed) {
        this.toggleEditable();
      }
    } catch (error) {
    }
  }

  }
