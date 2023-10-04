import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pais } from '../interface/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/paises/";

  constructor(private http: HttpClient) { }

  obtenerPaisPorId(paisId: bigint): Observable<Pais> {
    const url = `${this.url}${paisId}`;
    return this.http.get<Pais>(url);
  }

  obtenerPaises(){
    return this.http.get<Pais[]>(this.url);
  }


  obtenerPaisPorNombre(pais_nom: string): Observable<Pais> {
    const url = `${this.url}nombre-pais?pais_nom=${pais_nom}`;
    return this.http.get<Pais>(url);
  }
}