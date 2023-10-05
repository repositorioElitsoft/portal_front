import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor( private cookieService: CookieService) {
    const token = this.getToken();
    this.currentUser = token ? { token } : null;
  }
  
  isAuthenticatedUser() {
    // Evaluamos si existe una propiedad token en currentUser
    // return this.currentUser?.token;

    if (this.getToken()) {
      return true
    }
    return false;
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  logout(){}
}
