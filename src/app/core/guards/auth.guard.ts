import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticatedUser()) {
      const requiredRole = route.data['role'];
      const userRole = this.authService.currentUser.roles;

      console.log('usuario role: ', userRole);
      console.log('rol requerido: ', requiredRole);

      if (requiredRole != undefined) {
        if (requiredRole === userRole) {
          return true;
        } else {

         
          if(userRole === "ROLE_REC"){
            this.router.navigate(['/reclutador/welcome-reclutador']);
          }
          if(userRole === "ROLE_ADMIN"){
            this.router.navigate(['/admin/welcome-admin']);
          }

          //
          return false;
        }
      }
      return true;
    }
    
    this.router.navigate(['/iniciar-sesion']);
    return false;
  }
}
