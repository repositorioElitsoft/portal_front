import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Herramientas } from '../interface/herramientas.interface';
import { HerramientaData } from '../interface/herramienta-data.interface';


@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  url = "http://localhost:8080/herramientas/"

  constructor(private http: HttpClient) { }

  // guardarHerramienta(herramienta: Herramientas, usuarioId: number): Observable<Herramientas> {
  //   return this.http.post<Herramientas>(`${this.url}?usr_id=${usuarioId}`, herramienta);
  // }

  guardarHerramienta(herramienta: HerramientaData[]): Observable<HerramientaData> {
    return this.http.post<HerramientaData>(this.url, herramienta);
  }

  obtenerHerramientaPorId(herramientaId: number): Observable<Herramientas> {
    return this.http.get<Herramientas>(`${this.url}${herramientaId}`);
  }


  obtenerHerramientasConProductosPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario-con-productos/${usuarioId}`);
  }

  listarHerramientas(): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}lista-herramientas`);
  }
}