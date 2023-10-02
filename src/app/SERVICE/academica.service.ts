import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Academica } from '../interface/academica.interface';

@Injectable({
  providedIn: 'root'
})
export class AcademicaService {

  url = "http://localhost:8080/academicas/"

  constructor(private http: HttpClient) { }

  guardarAcademica(academica: Academica, usuarioId: number): Observable<Academica> {
    return this.http.post<Academica>(`${this.url}?usr_id=${usuarioId}`, academica);
  }

  obtenerAcademicasPorUsuario(usuarioId: number): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  listarAcademicas(): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}listar`);
  }
}
