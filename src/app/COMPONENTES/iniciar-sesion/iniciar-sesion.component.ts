import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/login.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AuthService } from 'src/app/service/auth.service';
import jwtDecode from 'jwt-decode';

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
    private cookieService: CookieService,
    private authService: AuthService
    ) 
    { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (token) => {
        this.cookieService.set('token', token.Authorization);
        const tokenDecode = jwtDecode(this.authService.getToken());
        this.authService.currentUser = tokenDecode;

        const userRole = this.authService.currentUser.roles;
        console.log(`userRole: ${userRole}`);

        if ( userRole === 'ROLE_ADMIN' ) {
          this.router.navigate(['/admin/welcome-admin']); 
        }
        else if ( userRole === 'ROLE_REC' ) {
          this.router.navigate(['/reclutador/welcome-reclutador']); 
        }
        else {
          this.router.navigate(['/user/datos_personales']);
        }        
      },
      (e) => {
        console.log(`Error: ${e}`);
        this.inicioSesionFallido = true 
      }
      
    );
  }
}