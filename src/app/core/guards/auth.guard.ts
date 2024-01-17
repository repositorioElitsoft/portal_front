import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticatedUser()) {
      const requiredRole = route.data['role'];

      const userRoles = this.authService.currentUser.authorities;

      console.log('usuario roles: ', userRoles);
      console.log('rol requerido: ', requiredRole);
      if (requiredRole !== undefined) {
        if (userRoles.includes(requiredRole)) {
          return true;
        } else {
          if (userRoles.includes("ROLE_REC")) {
            this.router.navigate(['/reclutador/welcome-reclutador']);
          }

          if (userRoles.includes("ROLE_ADMIN")) {
            this.router.navigate(['/admin/welcome-admin']);
          }

          if (userRoles.includes("ROLE_ENTR") || userRoles.includes("ENTR_TEC")) {
            this.router.navigate(['/reclutador/welcome-reclutador']);
          }

          return false;
        }
      } else if (userRoles.includes("ROLE_GUEST")) {
        this.router.navigate(['user/datos-personales']);
        return true;
      }
      return false;

    }
    this.router.navigate(['/iniciar-sesion']);
    return false;
  }
}
