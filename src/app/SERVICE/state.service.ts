import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State } from '../interface/state.interface';
import { Observable } from 'rxjs/internal/Observable';
import { City } from '../interface/city.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly url = `${environment.URL_HOST}/state/`
  constructor(private http: HttpClient) { }

  obtenerEstados(){
    return this.http.get<State[]>(this.url);
  }

  obtenerEstadoPorId(Id: number): Observable<State> {
    const url = `${this.url}${Id}`;
    return this.http.get<State>(url);
  }

  obtenerEstadosPorPais(countryId: number): Observable<State[]> {
    const url = `${environment.URL_HOST}/country/${countryId}/states`;

    return this.http.get<State[]>(url);
  }

  obtenerEstadosporCountry(countryId:number):Observable<State[]>{
    return this.http.get<State[]>(`${this.url}country/${countryId}`);
  }
}
