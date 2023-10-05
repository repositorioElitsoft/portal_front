import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service';
import { LoginService } from 'src/app/service/login.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-peticion-restaurar-pass',
  templateUrl: './peticion-restaurar-pass.component.html',
  styleUrls: ['./peticion-restaurar-pass.component.css']
})
export class PeticionRestaurarPassComponent {
  loginForm: FormGroup;
  error = '';
  email = '';
  usr_pass = '';
  inicioSesionFallido = false;
  mensajeError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private usuarioService: UsuarioService,) 
    { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
      });
    }

  ngOnInit() {
  }

  onSubmit() {
   
    this.usuarioService.pedirReinicioPass(this.loginForm.get('email')?.value).subscribe(
      async (res) => {
        try{
        console.log(res)
        const isConfirmed = await this.notification.showNotification(
          "success",
          "Restauración de Contraseña",
          "Revisa tu bandeja de entrada, si el email existe recibirás un correo con instrucciones para restaurar tu constraseña."
        );
  
        if (isConfirmed) {
          this.router.navigate(['/']);
        }
      
      } catch (error) {

      }
        
      },
      (e) => {
        console.log(`Error: ${e}`);
        this.inicioSesionFallido= true 
      }
      
    );
  }
}