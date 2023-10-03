import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoUsuario } from '../interface/cargos-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class CargosUsuarioService {

  url = "http://localhost:8080/cargos/"

  constructor(private http: HttpClient) {}

  guardarCargo(cargo: CargoUsuario): Observable<CargoUsuario> {
    return this.http.post<CargoUsuario>(this.url, cargo);
  }

  obtenerCargosPorUsuario(usuarioId: number): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  listarCargos(): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}listar`);
  }
}