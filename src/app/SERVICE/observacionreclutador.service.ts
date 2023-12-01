// observacion-reclutador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observacion } from '../interface/observacionreclutador.interface';


@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  private baseUrl = 'http://localhost:8080/observaciones';

  constructor(private http: HttpClient) { }

  obtenerObservacionesPorUsuario(userId: number): Observable<Observacion[]> {
    return this.http.get<Observacion[]>(`${this.baseUrl}/por-usuario/${userId}`);
  }

  guardarObservacionRec(observacion: Observacion, userId: number, usr_id_obs: number, usr_id_obs_mod: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/guardarRec/${userId}/${usr_id_obs}/${usr_id_obs_mod}`, observacion);
  }

  actualizarObservacionRec(observacionId: number, observacion: Observacion, usr_id_obs_mod: number): Observable<Observacion> {
    return this.http.put<Observacion>(`${this.baseUrl}/actualizar/${observacionId}?usr_id_obs_mod=${usr_id_obs_mod}`, observacion);
  }

  obtenerNombresUsuarios(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.baseUrl}/nombres-usuarios`);
  }

  
}


