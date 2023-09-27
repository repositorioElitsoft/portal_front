import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Niveles } from '../interface/niveles.interface';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/niveles/";

  constructor(private http: HttpClient) { }

  listarNiveles(): Observable<Niveles[]> {
    return this.http.get<Niveles[]>(this.url);
  }

  obtenerNivelPorId(id: number): Observable<Niveles> {
    const url = `${this.url}${id}`;
    return this.http.get<Niveles>(url);
  }

}