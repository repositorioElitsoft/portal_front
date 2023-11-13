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

  obtenerObservacionesPorUsuario(usuarioId: number): Observable<Observacion[]> {
    return this.http.get<Observacion[]>(`${this.url}/usuario/${usuarioId}`);
  }

  guardarObservacion(observacion: Observacion): Observable<Observacion> {
    return this.http.post<Observacion>(`${this.url}/guardar`, observacion);
  }

  eliminarObservacion(observacionId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${observacionId}`);
  }

  actualizarObservacion(obs_id: number, observacion: Observacion): Observable<Observacion> {
    return this.http.put<Observacion>(`${this.url}/actualizar/${obs_id}`, observacion);
  }
}
