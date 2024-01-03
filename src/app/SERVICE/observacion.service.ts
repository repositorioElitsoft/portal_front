import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observacion } from '../interface/observacion.interface';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  readonly url = `${environment.URL_HOST}/observaciones`
  constructor(private http: HttpClient) { }
  obtenerObservacionesPorUsuario(userId: number): Observable<Observacion[]> {
    const url = `${this.url}/por-usuario/${userId}`;
    return this.http.get<Observacion[]>(url);
  }
  guardarObservacionCat(observacion: Observacion, userId: number, catObsId: number, usr_id_obs: number, usr_id_obs_mod: number
  ): Observable<boolean> {
    const url = `${this.url}/guardarCat/${userId}/${catObsId}/${usr_id_obs}/${usr_id_obs_mod}`;
    return this.http.post<boolean>(url, observacion);
  }
}