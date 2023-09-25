import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = 'http://localhost:8080';
  public loginStatusSubjec = new Subject<boolean>();
  
  constructor(private HttpClient: HttpClient ) { }

  public registrarUsuario(user:any){
    return this.HttpClient.post(`${this.baseUrl}/usuarios/`, user)
  }

  public iniciarSesion(datosInicioSesion: any) {
    return this.HttpClient.post(`${this.baseUrl}/usuarios/iniciar-sesion/`, datosInicioSesion);
  
  }

  obtenerPerfil(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseUrl}/usuarios/email/${email}`);
  }

  
  obtenerUsuarios(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.baseUrl}/usuarios/`);
  }

  eliminarUsuario(usr_id: number) {
    return this.HttpClient.delete(`${this.baseUrl}/usuarios/${usr_id}`);
}

  guardarUsuarioEnLocalStorage(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuarioDesdeLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  eliminarUsuarioEnLocalStorage() {
    localStorage.removeItem('usuario');
  }

  obtenerRolUsuario(email: string): Observable<string> {
    return this.HttpClient.get<string>(`${this.baseUrl}/usuarios/${email}`);
  }

//////////////////////////////////

  public getCurrentUser(){
    return this.HttpClient.get(`${this.baseUrl}/actual-usuario`);
  }
   public logout() {
     localStorage.removeItem('user');
     return true;
   }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}

