import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Register } from '../interface/register.interface';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = 'http://localhost:8080';
  public loginStatusSubjec = new Subject<boolean>();
  
  constructor(private HttpClient: HttpClient,private route: ActivatedRoute, ) { }

  public registrarUsuario(registerData: Register){
    return this.HttpClient.post<any>(`${this.baseUrl}/usuarios/`, registerData)
  }

  public cambiarPassword(newPassword: string){
    const cod = this.route.snapshot.queryParamMap.get("code");
    return this.HttpClient.put<any>(`${this.baseUrl}/usuarios/cambiar-password/${cod}`, {pass: newPassword})
  }
  
  public iniciarSesion(datosInicioSesion: any) {
    return this.HttpClient.post(`${this.baseUrl}/usuarios/iniciar-sesion/`, datosInicioSesion);
  }

  obtenerPerfil(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseUrl}/usuarios/email/${email}`);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.baseUrl}/usuarios/usuarios-herramientas`);
  }

  eliminarUsuario(usr_id: number) {
    return this.HttpClient.delete(`${this.baseUrl}/usuarios/${usr_id}`);
  }

  guardarUsuarioEnLocalStorage(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  obtenerUsuarioGuardado() {
    return this.HttpClient.get<Usuario>(`${this.baseUrl}/usuarios/`);
  }
  updateUsuario(user: Usuario){
    return this.HttpClient.put<Usuario>(`${this.baseUrl}/usuarios/`,user);
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

  pedirReinicioPass(email: string){
    return this.HttpClient.post(`${this.baseUrl}/usuarios/pedir-restauracion-pass`,{usr_email: email});
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

  public getCv(userId: any){
    return this.HttpClient.get(`${this.baseUrl}/usuarios/file/${userId}`);
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public downloadCv(userId: any): Observable<Blob> {
    return this.HttpClient.get(`${this.baseUrl}/usuarios/file/${userId}`, {responseType: 'blob'});
  }
}