import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employment } from '../interface/employment.interface';
import { Herramientas } from '../interface/herramientas.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LaboralService {
  readonly url = `${environment.URL_HOST}/employment/`
  constructor(private http: HttpClient) { }

  
  guardarLaboral(employment: Employment | undefined, id: number | null | undefined): Observable<Employment> {
    if(id){
      console.log('Se actualiza')
      return this.http.put<Employment>(`${this.url}${id}`, employment);
    }
    return this.http.post<Employment>(this.url, employment);
  }
  obtenerHerramientasPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario/${usuarioId}`);
  }
  obtenerListaLaboralPorUsuario(): Observable<Employment[]> {
    return this.http.get<Employment[]>(`${this.url}`);
  }
  obtenerLaboralPorId(employmentId: number): Observable<Employment> {
    return this.http.get<Employment>(`${this.url}obtener/${employmentId}`);
  }
  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }
  eliminarLaboral(id: number | null | undefined): Observable<Employment> {
    return this.http.delete<Employment>(`${this.url}${id}`);
  }
}