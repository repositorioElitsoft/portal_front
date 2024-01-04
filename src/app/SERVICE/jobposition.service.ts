import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPosition } from '../interface/jobposition.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  readonly url = `${environment.URL_HOST}/JobPosition/`
  constructor(private http: HttpClient) { }
  obtenerListaJobPosition(): Observable<JobPosition[]> {
    return this.http.get<JobPosition[]>(`${this.url}listar`);
  }
}