import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/SERVICE/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  inicioSesionFallido = false;
  mensajeError = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private cookieService: CookieService) {
    this.loginForm = this.formBuilder.group({
      usr_email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      usr_pass: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(
      this.loginForm.get('usr_email')?.value,
      this.loginForm.get('usr_pass')?.value
    ).subscribe(
      (token) => {
        this.cookieService.set('token', token.Authorization);
        this.router.navigate(['/datos_personales']);
      },
      (e) => {
        console.log(`Error: ${e}`);
        this.inicioSesionFallido = true;
        this.mensajeError = 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      }
    );
  }
}
