import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargosElitsoft } from '../interface/cargos-elitsoft.interface'

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