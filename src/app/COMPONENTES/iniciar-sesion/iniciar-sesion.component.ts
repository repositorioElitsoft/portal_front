import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service';
import { LoginService } from 'src/app/service/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  email = '';
  usr_pass = '';
  inicioSesionFallido = false;
  mensajeError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private cookieService: CookieService) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (token) => {
        this.cookieService.set('token', token.Authorization)
        this.router.navigate(['/datos_personales']);
      },
      (e) => {
        console.log(`Error: ${e}`);
      }
    );
  }

}
