import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-peticion-restaurar-pass',
  templateUrl: './peticion-restaurar-pass.component.html',
  styleUrls: ['./peticion-restaurar-pass.component.css']
})
export class PeticionRestaurarPassComponent {
  loginForm: FormGroup;
  error = '';
  email = '';
  password = '';
  inicioSesionFallido = false;
  mensajeError = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private userService: UserService,) 
    { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
      });
    }
  ngOnInit() {
  }
  onSubmit() {
    this.userService.pedirReinicioPass(this.loginForm.get('email')?.value).subscribe(
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