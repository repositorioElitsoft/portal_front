import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interface/pais.interface';
import { Laboral } from '../interface/laboral.interface';
import { Herramientas } from '../interface/herramientas.interface';


@Injectable({
  providedIn: 'root'
})
export class LaboralService {

  url = "http://localhost:8080/laboral/"

  constructor(private http: HttpClient) { }

  guardarLaboral(laboral: Laboral | undefined, id: number | null | undefined): Observable<Laboral> {
    if(id){
      return this.http.put<Laboral>(`${this.url}${id}`, laboral);
    }
    return this.http.post<Laboral>(this.url, laboral);
  }

  obtenerHerramientasPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  obtenerListaLaboralPorUsuario(): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}`);
  }

  obtenerListaLaboral(): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}`);
  }

  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }

  eliminarLaboral(id: number | null | undefined): Observable<Laboral> {
    return this.http.delete<Laboral>(`${this.url}${id}`);
  }
}