import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserJob } from '../interface/user-job.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserJobService{
  readonly url = `${environment.URL_HOST}/userjob/`
  constructor(private http: HttpClient) {}
  guardarCargo(cargo: UserJob): Observable<UserJob> {
    cargo.applicationDate = new Date();
    if (cargo.id) {
      return this.http.put<UserJob>(`${this.url}${cargo.id}`, cargo);
    } else {
      return this.http.post<UserJob>(this.url, cargo);
      
    }
  }
  obtenerCargosPorUsuario(usuarioId: number): Observable<UserJob[]> {
    return this.http.get<UserJob[]>(`${this.url}por-usuario/${usuarioId}`);
  }
  listarCargos(): Observable<UserJob[]> {
    return this.http.get<UserJob[]>(`${this.url}listar`);
  }
  getCargosByUserId(){
    return this.http.get<UserJob[]>(`${this.url}`);   
  } 

  eliminarCargosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.delete(`${this.url}/${usuarioId}`);
  }

  eliminarPostulacionPorId(postulacionId: Number): Observable<boolean> {
    const url = `${this.url}eliminar-postulacion/${postulacionId}`;
    return this.http.delete<boolean>(url);
  }
}