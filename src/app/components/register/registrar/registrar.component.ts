import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interface/register.interface';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  registroForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router, private notification: NotificationService){
    this.registroForm = new FormGroup({
      usr_email: new FormControl('', [Validators.required, Validators.email]),
      usr_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });  
  }
  onSubmit() {
    if (this.registroForm.valid) {
      const registerData: Register = {
        usr_email: this.registroForm.get('usr_email')?.value,
        usr_pass: this.registroForm.get('usr_pass')?.value
      }
      this.usuarioService.registrarUsuario(registerData).subscribe(
        () => {
          this.notification.showNotification(
            'success',
            'Registro Exitoso',
            'Hemos enviado un correo de confirmacion.');
        },
        () => this.notification.showNotification(
          'error',
          'Error al registrar el usuario',
          'Hubo un error al registrar el usuario. Por favor, inténtalo más tarde.'
        )
      );
    } else {
      this.notification.showNotification(
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
}