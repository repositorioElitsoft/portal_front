import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserJob } from '../interface/user-job.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CargosUsuarioService {
  readonly url = `${environment.URL_HOST}/userjob/`
  constructor(private http: HttpClient) {}
  guardarCargo(cargo: UserJob): Observable<UserJob> {  
    cargo.applicationDate = new Date(); 
    return this.http.post<UserJob>(this.url, cargo);
  }
  obtenerCargosPorUsuario(usuarioId: number): Observable<UserJob[]> {
    return this.http.get<UserJob[]>(`${this.url}por-usuario/${usuarioId}`);
  }
  listarCargos(): Observable<UserJob[]> {
    return this.http.get<UserJob[]>(`${this.url}listar`);
  }
  getCargosByUserId(){
    return this.http.get<UserJob>(`${this.url}`);   
  } 
}
