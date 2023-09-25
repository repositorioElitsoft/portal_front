import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CertificacionService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/certificados/";

  constructor(private http: HttpClient) { }

  obtenerTodosLosCertificados(): Observable<Certificacion[]> {
    return this.http.get<Certificacion[]>(this.url);
  }

  obtenerCertificadosPorNombre(nombre: string): Observable<Certificacion[]> {
    const url = `${this.url}${nombre}`;
    return this.http.get<Certificacion[]>(url);
  }
}

export interface Certificacion{
  cert_id?:number,
  cert:string

}
