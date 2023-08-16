import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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


  obtenerPaisPorNombre(pais_nom: string): Observable<Pais> {
    const url = `${this.url}nombre-pais?pais_nom=${pais_nom}`;
    return this.http.get<Pais>(url);
  }
}

export interface Pais {
  pais_id?:bigint
  pais_nom:string
}
