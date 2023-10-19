import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pais } from '../interface/pais.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {


  readonly url = `${environment.URL_HOST}/paises/`

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
