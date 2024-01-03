// observacion-reclutador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatObservacionDTO, Observacion, ObservacionDTO } from '../interface/observacionreclutador.interface';
@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  private baseUrl = 'http://localhost:8080/observaciones';
  constructor(private http: HttpClient) { }
  obtenerObservacionesPorUsuario(userId: number): Observable<Observacion[]> {
    return this.http.get<Observacion[]>(`${this.baseUrl}/por-usuario/${userId}`);
  }
  guardarObservacionRec(observadores: ObservacionDTO, userId: number, usr_id_obs: number, usr_id_obs_mod: number): Observable<ObservacionDTO> {
    return this.http.post<ObservacionDTO>(`${this.baseUrl}/guardarRec/${userId}/${usr_id_obs}/${usr_id_obs_mod}`, observadores);
  }
  actualizarObservacionRec(observacionId: number, observadores: ObservacionDTO, usr_id_obs_mod: number): Observable<ObservacionDTO> {
    return this.http.put<ObservacionDTO>(`${this.baseUrl}/actualizar/${observacionId}/${usr_id_obs_mod}`, observadores);
  }
  obtenerNombresUsuarios(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.baseUrl}/nombres-usuarios`);
  }
  obtenerObservacionesPorUsuarioId(usrId: number): Observable<ObservacionDTO[]> {
    return this.http.get<ObservacionDTO[]>(`${this.baseUrl}/${usrId}`);
  }
  guardarObservacionCat(catObservacion: CatObservacionDTO, userId: number, catObsId: number, usr_id_obs: number, usr_id_obs_mod: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/guardarCat/${userId}/${catObsId}/${usr_id_obs}/${usr_id_obs_mod}`, catObservacion);
  }
  actualizarObservacionCat(obsId: number, catObsId: number, usrIdObsMod: number, catObservacion: CatObservacionDTO ): Observable<CatObservacionDTO> {
    return this.http.put<CatObservacionDTO>(`${this.baseUrl}/actualizarCat/${obsId}/${catObsId}/${usrIdObsMod}`, catObservacion);
  }
  obtenerCatObservacionesPorUsuarioId(usrId: number): Observable<CatObservacionDTO[]> {
    return this.http.get<CatObservacionDTO[]>(`${this.baseUrl}/Cat/${usrId}`);
  }
}