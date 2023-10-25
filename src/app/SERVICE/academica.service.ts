import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Academica } from '../interface/academica.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicaService {

  readonly url = `${environment.URL_HOST}/academicas/`

  constructor(private http: HttpClient) { }

  guardarAcademica(academica: Academica, usuarioId: number | undefined | null): Observable<Academica> {
    if (usuarioId){
      return this.http.put<Academica>(`${this.url}${usuarioId}`, academica);
    }
    return this.http.post<Academica>(`${this.url}`, academica);
  }

  obtenerListaAcademicasPorUsuario(): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}`);
  }

  listarAcademicas(): Observable<Academica[]> {
    return this.http.get<Academica[]>(`${this.url}listar`);
  }

  eliminarAcademica(id: number | null | undefined): Observable<Academica> {
    return this.http.delete<Academica>(`${this.url}${id}`);
  }

}
