import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: any = null;
  constructor( private cookieService: CookieService) {
    const token = this.getToken();
    this.currentUser = token ? { token } : null;
  }
  isAuthenticatedUser() {
    if (this.getToken()) {
      const token = jwtDecode(this.getToken());
      console.log("current user from token:", token)
      this.currentUser = token;
      return true
    }
    return false;
  }
  getToken(): string {
    return this.cookieService.get('token');
  }
  logout(){}
  getUserId(): number | null {
    const usuario: any = this.getUserId();
    return usuario?.id ?? null;
  }

  getAuthorities(): Set<string>{
    return new Set (this.currentUser?.authorities)
  }
}