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
  readonly url = `${environment.URL_HOST}/laboral/`
  constructor(private http: HttpClient) { }
  guardarLaboral(laboral: Employment | undefined, id: number | null | undefined): Observable<Employment> {
    if(id){
      console.log('Se actualiza')
      return this.http.put<Employment>(`${this.url}${id}`, laboral);
    }
    return this.http.post<Employment>(this.url, laboral);
  }
  obtenerHerramientasPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario/${usuarioId}`);
  }
  obtenerListaLaboralPorUsuario(): Observable<Employment[]> {
    return this.http.get<Employment[]>(`${this.url}`);
  }
  obtenerLaboralPorId(laboralId: number): Observable<Employment> {
    return this.http.get<Employment>(`${this.url}obtener/${laboralId}`);
  }
  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }
  eliminarLaboral(id: number | null | undefined): Observable<Employment> {
    return this.http.delete<Employment>(`${this.url}${id}`);
  }
}