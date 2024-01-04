import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academical } from '../interface/academical.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AcademicaService {
  readonly url = `${environment.URL_HOST}/academicas/`
  constructor(private http: HttpClient) { }
  guardarAcademica(academica: Academical, acadId: number | undefined | null): Observable<Academical> {
    if (acadId){
      return this.http.put<Academical>(`${this.url}${acadId}`, academica);
    }
    return this.http.post<Academical>(`${this.url}`, academica);
  }
  actualizarAcademica(academicaId: number, academica: Academical, jwt: string): Observable<Academical> {
    const url = `${this.url}${academicaId}`;
    const headers = new HttpHeaders({
      'Authorization': jwt
    });
    return this.http.put<Academical>(url, academica, { headers });
  }
  obtenerListaAcademicasPorUsuario(): Observable<Academical[]> {
    return this.http.get<Academical[]>(`${this.url}`);
  }
  obtenerAcademica(id: number | null | undefined): Observable<Academical> {
    return this.http.get<Academical>(`${this.url}${id}`);
  }
  listarAcademicas(): Observable<Academical[]> {
    return this.http.get<Academical[]>(`${this.url}listar`);
  }
  eliminarAcademica(id: number | null | undefined): Observable<Academical> {
    return this.http.delete<Academical>(`${this.url}${id}`);
  }
}