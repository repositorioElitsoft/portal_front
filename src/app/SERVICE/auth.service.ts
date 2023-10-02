import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor() {
    const token = localStorage.getItem('token');
    this.currentUser = token ? { token } : null;
  }
  
  isAuthenticatedUser(): boolean {
    // Evaluamos si existe una propiedad token en currentUser
    return !!this.currentUser?.token;
  }

  logout(){}
}
