import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { HttpClient } from '@angular/common/http'; // Importa el módulo HttpClient
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service'; // Importa el servicio UsuarioService
import Swal from 'sweetalert2';

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
      const email = this.registroForm.get('email');
      const usr_pass = this.registroForm.get('usr_pass');
      
      this.usuarioService.registrarUsuario({email, usr_pass}).subscribe(
        () => this.handleSuccess(),
        () => this.handleError()
      );
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

  private handleSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Hemos enviado un correo de confirmacion.',
    });
  }

  private handleError() {
    Swal.fire({
      icon: 'error',
      title: 'Error al registrar el usuario',
      text: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
    });
  }
}

