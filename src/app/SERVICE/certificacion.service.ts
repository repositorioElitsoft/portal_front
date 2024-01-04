import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Certification } from '../interface/certificacion.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CertificacionService {
  readonly url = `${environment.URL_HOST}/certificados/`
  constructor(private http: HttpClient) { }
  obtenerTodosLosCertificados(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.url);
  }
  obtenerCertificadosPorNombre(nombre: string): Observable<Certification[]> {
    const url = `${this.url}${nombre}`;
    return this.http.get<Certification[]>(url);
  }
}