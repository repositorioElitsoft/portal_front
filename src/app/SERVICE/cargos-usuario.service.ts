import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosUsuarioService {

  url = "http://localhost:8080/cargos/"

  constructor(private http: HttpClient) {}

  guardarCargo(cargo: CargoUsuario, usuarioId: number): Observable<CargoUsuario> {
    return this.http.post<CargoUsuario>(`${this.url}?usr_id=${usuarioId}`, cargo);
  }

  obtenerCargosPorUsuario(usuarioId: number): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  listarCargos(): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}listar`);
  }
}


export interface CargoUsuario{

  crg_usr_id?:number,
  crg_usr_pret:string,
  usr_id?:number
}
