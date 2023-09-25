import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importa el módulo HttpClient
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service'; // Importa el servicio UsuarioService

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;
  registroFallido: boolean = false;
  mensajeError: string = '';

  constructor(private usuarioService: UsuarioService){
    this.registroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      usr_pass: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const email = this.registroForm.get('email')?.value;
      const usr_pass = this.registroForm.get('usr_pass')?.value;
  
      this.usuarioService.registrarUsuario({ email, usr_pass }).subscribe(
        (response) => {
          // Si el registro es exitoso, muestra un mensaje de éxito
          this.registroExitoso = true;
          this.registroFallido = false;
        },
        (error) => {
          // Si el registro falla, muestra un mensaje de error
          this.registroExitoso = false;
          this.registroFallido = true;
          this.mensajeError = 'Error al registrar el usuario';
        }
      );
    } else {
      // Si el formulario no es válido, muestra un mensaje de error
      this.registroExitoso = false;
      this.registroFallido = true;
      this.mensajeError = 'Formulario inválido, verifica los campos';
    }
  }
}

