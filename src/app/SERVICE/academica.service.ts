import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Academica } from '../interface/academica.interface'; // Asegúrate de importar la interfaz Academica
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicaService {

  readonly url = `${environment.URL_HOST}/academicas/`

  constructor(private http: HttpClient) { }

  guardarAcademica(academica: Academica, acadId: number | undefined | null): Observable<Academica> {
    if (acadId){
      return this.http.put<Academica>(`${this.url}${acadId}`, academica);
    }
    return this.http.post<Academica>(`${this.url}`, academica);
  }

  actualizarAcademica(academicaId: number, academica: Academica, jwt: string): Observable<Academica> {
    const url = `${this.url}${academicaId}`; // Asegúrate de que la URL y la ruta sean correctas
    const headers = new HttpHeaders({
      'Authorization': jwt
    });

    return this.http.put<Academica>(url, academica, { headers });
  }

  obtenerListaAcademicasPorUsuario(): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}`);
  }

  obtenerAcademica(id: number | null | undefined): Observable<Academica> {
    return this.http.get<Academica>(`${this.url}${id}`);
  }

  listarAcademicas(): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}listar`);
  }

  eliminarAcademica(id: number | null | undefined): Observable<Academica> {
    return this.http.delete<Academica>(`${this.url}${id}`);
  }
}
