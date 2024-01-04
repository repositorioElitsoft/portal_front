import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  email = '';
  password = '';
  inicioSesionFallido = false;
  mensajeError = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
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
        const userRoles = this.authService.currentUser.authorities;

        console.log("User roles: ", userRoles)

        if ( userRoles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/welcome-admin']);
        }
        else if ( userRoles.includes('ROLE_REC'))  {
          this.router.navigate(['/reclutador/welcome-reclutador']);
        }
        else if ( userRoles.includes('ROLE_ENTR'))  {
          this.router.navigate(['/entrevistador/welcome-entrevistador']);
        }
        else if ( userRoles.includes('ROLE_GUEST'))  {
          console.log("it's included")
          this.router.navigate(['/user/datos_personales']);
        }
      },
      (e) => {
        console.log(`Error: ${e}`);
        this.inicioSesionFallido = true
      }
    );
  }

  removeFirstAndLastCharacter(token: String) {
    if (typeof token !== 'string' || token.length < 2) {
        return token;
    }
    return token.substring(1, token.length - 1);
}
}