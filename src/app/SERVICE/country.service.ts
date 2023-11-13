import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../interface/country.interface';
import { environment } from 'src/environments/environment';
import { State } from '../interface/state.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  readonly url = `${environment.URL_HOST}/country/`

  constructor(private http: HttpClient) { }

  obtenerPaises(){
    return this.http.get<Country[]>(this.url);
  }

  obtenerPaisPorId(Id: bigint): Observable<Country> {
    const url = `${this.url}${Id}`;
    return this.http.get<Country>(url);
  }

  obtenerEstadosPorPais(countryId: bigint): Observable<State[]> {
    const url = `${this.url}${countryId}/states`;
    return this.http.get<State[]>(url);
  }

}
