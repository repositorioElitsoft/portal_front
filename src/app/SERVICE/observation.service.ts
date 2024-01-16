import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation, ObservacionDTO } from '../interface/observation.interface';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  private baseUrl = 'http://localhost:8080/observations';

  constructor(private http: HttpClient) { }

  crearObservacion(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.baseUrl}/`, observation);
  }

  obtenerObservacionesPorUserJob(userJobId: Number): Observable<ObservacionDTO[]> {
    return this.http.get<ObservacionDTO[]>(`${this.baseUrl}/user-job/${userJobId}`);
  }

  actualizarObservacion(observationId: Number, observation: Observation ): Observable<Observation> {
    return this.http.put<Observation>(`${this.baseUrl}/${observationId}`, observation, { });
  }

  eliminarObservacion(id: Number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
