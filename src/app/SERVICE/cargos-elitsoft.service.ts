import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosElitsoftService {

  url = "http://localhost:8080/cargoselitsoft/"

  constructor(private http: HttpClient) { }

  obtenerListaCargosElitsoft(): Observable<CargosElitsoft[]> {
    return this.http.get<CargosElitsoft[]>(`${this.url}listar`);
  }

}

export interface CargosElitsoft{

  crg_elit_id?:number,
  crg_elit_nom:string

}
