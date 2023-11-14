import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboral } from '../interface/laboral.interface';
import { Herramientas } from '../interface/herramientas.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LaboralService {


  readonly url = `${environment.URL_HOST}/laboral/`

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
  obtenerLaboralPorId(laboralId: number): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}obtener/${laboralId}`);
  }
  

  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }

  eliminarLaboral(id: number | null | undefined): Observable<Laboral> {
    return this.http.delete<Laboral>(`${this.url}${id}`);
  }
}
