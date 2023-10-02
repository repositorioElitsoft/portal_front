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

  guardarLaboral(laboral: Laboral, usrId: number, herrUsrId: number): Observable<Laboral> {
    const body = {
      laboral: laboral,
      usr_id: usrId,
      herr_usr_id: herrUsrId
    };

    return this.http.post<Laboral>(this.url, body);
  }

  obtenerHerramientasPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  obtenerListaLaboralPorUsuario(usuarioId: number): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}listar-por-usuario/${usuarioId}`);
  }

  obtenerListaLaboral(): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}listar`);
  }

  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }
}