import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Niveles } from '../interface/niveles.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NivelService {
  readonly url = `${environment.URL_HOST}/niveles/`
  constructor(private http: HttpClient) { }
  listarNiveles(): Observable<Niveles[]> {
    return this.http.get<Niveles[]>(this.url);
  }
  obtenerNivelPorId(id: number): Observable<Niveles> {
    const url = `${this.url}${id}`;
    return this.http.get<Niveles>(url);
  }
}