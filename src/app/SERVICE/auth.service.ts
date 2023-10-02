import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor( private cookieService: CookieService) {
    const token = localStorage.getItem('token');
    this.currentUser = token ? { token } : null;
  }
  
  isAuthenticatedUser(): boolean {
    // Evaluamos si existe una propiedad token en currentUser
    return !!this.currentUser?.token;
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  logout(){}
}
