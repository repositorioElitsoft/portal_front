import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City } from '../interface/city.interface';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  readonly url = `${environment.URL_HOST}/city/`
  constructor(private http: HttpClient) { }
  obtenerCiudades(){
    return this.http.get<City[]>(this.url);
  }
  obtenerPaisPorId(Id: bigint): Observable<City> {
    const url = `${this.url}${Id}`;
    return this.http.get<City>(url);
  }
  obtenerCiudadesPorEstado(stateId: number): Observable<City[]> {
    const url = `${this.url}state/${stateId}/cities`;
    return this.http.get<City[]>(url);
  }
  getStateByCountry(stateId:number):Observable<City[]>{
    return this.http.get<City[]>(`${this.url}state/${stateId}`);
  }
}