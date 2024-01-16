import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Register } from '../interface/register.interface';
import { ActivatedRoute } from '@angular/router';
import { UserEditarDTO, User } from '../interface/user.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = `${environment.URL_HOST}`
  public loginStatusSubjec = new Subject<boolean>();
  constructor(private HttpClient: HttpClient,private route: ActivatedRoute, ) { }
  public actualizarCV(formData: FormData): Observable<any>{
    return this.HttpClient.put<FormData>(`${this.url}/users/file`, formData);
  }
  public registrarUser(registerData: Register){
    return this.HttpClient.post<any>(`${this.url}/users/`, registerData)
  }
  public cambiarPassword(newPassword: string){
    const cod = this.route.snapshot.queryParamMap.get("code");
    return this.HttpClient.put<any>(`${this.url}/users/cambiar-password/${cod}`, {pass: newPassword})
  }
  public iniciarSesion(datosInicioSesion: any) {
    return this.HttpClient.post(`${this.url}/users/iniciar-sesion/`, datosInicioSesion);
  }

  obtenerUsers(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/users/users-herramientas`);
  }
  eliminarUserId(UserId: number): Observable<string> {
    return this.HttpClient.delete<string>(`${this.url}/users/eliminar/${UserId}`);
  }
  guardarUserEnLocalStorage(User: any) {
    localStorage.setItem('User', JSON.stringify(User));
  }
  getCurrentUser() {
    return this.HttpClient.get<User>(`${this.url}/users/`);
  }

  updateUserById(id: number, user: User): Observable<User>{
    return this.HttpClient.put<User>(`${this.url}/users/actualizar/${id}`, user);
  }
  obtenerUserDesdeLocalStorage() {
    const UserString = localStorage.getItem('User');
    return UserString ? JSON.parse(UserString) : null;
  }
  eliminarUserEnLocalStorage() {
    localStorage.removeItem('User');
  }
  obtenerRolUser(email: string): Observable<string> {
    return this.HttpClient.get<string>(`${this.url}/users/${email}`);
  }
  pedirReinicioPass(email: string){
    return this.HttpClient.post(`${this.url}/users/pedir-restauracion-pass`,{email: email});
  }
  guardarAdmin(User: User): Observable<User> {
    return this.HttpClient.post<User>(`${this.url}/users/admin`, User);
  }
  guardarRec(User: User): Observable<User> {
    return this.HttpClient.post<User>(`${this.url}/users/rec`, User);
  }
  public getUserId(UserId: number):Observable<any>{
    return this.HttpClient.get(`${this.url}/users/${UserId}`)
  }
  public actualizarUserAdmin(UserId: number, User: UserEditarDTO): Observable<UserEditarDTO> {
    return this.HttpClient.put<UserEditarDTO>(`${this.url}/users/actualizar/${UserId}`, User);
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
    return this.HttpClient.get(`${this.url}/users/file/${userId}`);
  }
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  public downloadCv(userId: any): Observable<Blob> {
    return this.HttpClient.get(`${this.url}/users/file/${userId}`, {responseType: 'blob'});
  }
  public borrarCV(UserId: number): Observable<any> {
    const url = `${this.url}/users/eliminar-cv/${UserId}`;
    return this.HttpClient.delete(url);
  }
  public registrarUsuario(registerData: Register){
    return this.HttpClient.post<any>(`${this.url}/usuarios/`, registerData)
  }
  obtenerPerfil(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}/usuarios/email/${email}`);
  }
  obtenerUsuarios(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/users/usuarios-herramientas`);
  }
  eliminarUsuarioId(usuarioId: number): Observable<string> {
    return this.HttpClient.delete<string>(`${this.url}/usuarios/eliminar/${usuarioId}`);
  }
  guardarUsuarioEnLocalStorage(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  obtenerUsuarioGuardado() {
    return this.HttpClient.get<User>(`${this.url}/users/`);
  }
  updateUser(user: User){
    return this.HttpClient.put<User>(`${this.url}/users/`,user);
  }
  updateUsuarioById(id: number, user: User): Observable<User>{
    return this.HttpClient.put<User>(`${this.url}/usuarios/actualizar/${id}`, user);
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
 

  public getUsuarioId(usuarioId: number):Observable<any>{
    return this.HttpClient.get(`${this.url}/users/${usuarioId}`)
  }
  public actualizarUsuarioAdmin(usuarioId: number, usuario: UserEditarDTO): Observable<UserEditarDTO> {
    return this.HttpClient.put<UserEditarDTO>(`${this.url}/users/actualizar/${usuarioId}`, usuario);
  }
 
  createOrUpdatePreferredJob(userPreferredJob: any): Observable<any> {
    return this.HttpClient.post(`${this.url}/users/preferred`, userPreferredJob);
  }

  getPreferredJob(): Observable<any> {
    return this.HttpClient.get(`${this.url}/users/preferred`);
  }

}