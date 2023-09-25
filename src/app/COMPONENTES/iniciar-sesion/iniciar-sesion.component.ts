import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  email = '';
  usr_pass = '';
  inicioSesionFallido = false;
  mensajeError = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const datosInicioSesion = {
      email: this.email,
      usr_pass: this.usr_pass
      
    };

    

    this.usuarioService.iniciarSesion(datosInicioSesion).subscribe(
      (data: any) => {


          // Aquí puedes manejar la respuesta del servidor en caso de inicio de sesión exitoso

          
        console.log('Inicio de sesión exitoso', data);
          
        this.usuarioService.guardarUsuarioEnLocalStorage(data);
         
        
         // Redireccionar según el correo electrónico del usuario
        if (this.email === 'admin@ejemplo.com') {
          this.router.navigate(['/admin/welcome-admin']);
        } else if (this.email === 'juan.perez4@example.com') {
          this.router.navigate(['/reclutador/welcome-reclutador']);
        } else {
          // Redireccionar a otra página por defecto si el correo no coincide con los casos anteriores
          // Por ejemplo, puedes redireccionar a una página de bienvenida genérica
          this.router.navigate(['/bienvenida']);
        }
      },
      (error) => {
        // Aquí manejas el error en caso de inicio de sesión fallido
        this.inicioSesionFallido = true;
        this.mensajeError = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
        console.error('Error en inicio de sesión', error);
      }
    );
  }


 

}