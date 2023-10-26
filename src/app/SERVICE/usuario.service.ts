import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Register } from '../interface/register.interface';
import { ActivatedRoute } from '@angular/router';
import { UserEditarDTO, Usuario } from '../interface/user.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly url = `${environment.URL_HOST}`

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private HttpClient: HttpClient,private route: ActivatedRoute, ) { }

  public actualizarCV(formData: FormData): Observable<any>{
    return this.HttpClient.put<FormData>(`${this.url}/usuarios/file`, formData);
  }

  public registrarUsuario(registerData: Register){
    return this.HttpClient.post<any>(`${this.url}/usuarios/`, registerData)
  }

  public cambiarPassword(newPassword: string){
    const cod = this.route.snapshot.queryParamMap.get("code");
    return this.HttpClient.put<any>(`${this.url}/usuarios/cambiar-password/${cod}`, {pass: newPassword})
  }

  public iniciarSesion(datosInicioSesion: any) {
    return this.HttpClient.post(`${this.url}/usuarios/iniciar-sesion/`, datosInicioSesion);
  }

  obtenerPerfil(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}/usuarios/email/${email}`);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/usuarios/usuarios-herramientas`);
  }

  eliminarUsuarioId(usuarioId: number): Observable<string> {
    return this.HttpClient.delete<string>(`${this.url}/usuarios/eliminar/${usuarioId}`);
  }

  guardarUsuarioEnLocalStorage(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  obtenerUsuarioGuardado() {
    return this.HttpClient.get<Usuario>(`${this.url}/usuarios/`);
  }
  updateUsuario(user: Usuario){
    return this.HttpClient.put<Usuario>(`${this.url}/usuarios/`,user);
  }

  obtenerUsuarioDesdeLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  eliminarUsuarioEnLocalStorage() {
    localStorage.removeItem('usuario');
  }

  obtenerRolUsuario(email: string): Observable<string> {
    return this.HttpClient.get<string>(`${this.url}/usuarios/${email}`);
  }

  pedirReinicioPass(email: string){
    return this.HttpClient.post(`${this.url}/usuarios/pedir-restauracion-pass`,{usr_email: email});
  }

  guardarAdmin(usuario: Usuario): Observable<Usuario> {
    return this.HttpClient.post<Usuario>(`${this.url}/usuarios/admin`, usuario);
  }

  guardarRec(usuario: Usuario): Observable<Usuario> {
    return this.HttpClient.post<Usuario>(`${this.url}/usuarios/rec`, usuario);
  }

  public getUsuarioId(usuarioId: number):Observable<any>{
    return this.HttpClient.get(`${this.url}/usuarios/${usuarioId}`)
  }

  public actualizarUsuarioAdmin(usuarioId: number, usuario: UserEditarDTO): Observable<UserEditarDTO> {
    return this.HttpClient.put<UserEditarDTO>(`${this.url}/usuarios/actualizar/${usuarioId}`, usuario);
  }



//////////////////////////////////

  public getCurrentUser(){
    return this.HttpClient.get(`${this.url}/actual-usuario`);
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
    return this.HttpClient.get(`${this.url}/usuarios/file/${userId}`);
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public downloadCv(userId: any): Observable<Blob> {
    return this.HttpClient.get(`${this.url}/usuarios/file/${userId}`, {responseType: 'blob'});
  }
}
