import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { HttpClient } from '@angular/common/http'; // Importa el módulo HttpClient
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service'; // Importa el servicio UsuarioService
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Register } from 'src/app/interface/register-interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  registroForm: FormGroup;

  constructor(private usuarioService: UsuarioService){
    this.registroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      usr_pass: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });  
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // Desestructuramos el objeto this.registroForm para guardarlos en las variables "email", "usr_pass" y le decimos que seran del tipo Register(Interface)
      const { email, usr_pass } = this.registroForm.value as Register;      

      this.usuarioService.registrarUsuario({ email, usr_pass }).subscribe(
        () => this.popUp(
          'success',
          'Registro Exitoso',
          'Hemos enviado un correo de confirmacion.'
        ),
        () => this.popUp(
          'error',
          'Error al registrar el usuario',
          'Hubo un error al registrar el usuario. Por favor, inténtalo más tarde.'
        )
      );
    } else {
      this.popUp(
        'error',
        'Error en el formulario',
        'Hubo al enviar el formulario. Por favor, revisa los campos.'
      )
    }
  }

  private passwordMatchValidator (control: AbstractControl): ValidationErrors | null {
    const pass = control.get('usr_pass')?.value;
    const confirmPass = control.get('confirmPassword')?.value;

    const isMismatch = pass !== confirmPass;
    console.log('Contraseña:', pass);
    console.log('Confirmar contraseña:', confirmPass);
    console.log('Contraseña coincide:', !isMismatch);

    return pass === confirmPass ? null : { passwordMismatch: true };
  };

  private popUp(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
    });
  }
}