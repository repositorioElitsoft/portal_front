import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Certificacion } from '../interface/certificacion.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CertificacionService {


  readonly url = `${environment.URL_HOST}/certificados/`

  constructor(private http: HttpClient) { }

  obtenerTodosLosCertificados(): Observable<Certificacion[]> {
    return this.http.get<Certificacion[]>(this.url);
  }

  obtenerCertificadosPorNombre(nombre: string): Observable<Certificacion[]> {
    const url = `${this.url}${nombre}`;
    return this.http.get<Certificacion[]>(url);
  }
}
