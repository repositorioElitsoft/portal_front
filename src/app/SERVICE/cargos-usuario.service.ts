import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoUsuario } from '../interface/cargos-usuario.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CargosUsuarioService {
  readonly url = `${environment.URL_HOST}/cargos/`
  constructor(private http: HttpClient) {}
  guardarCargo(cargo: CargoUsuario): Observable<CargoUsuario> {  
    cargo.fechaPostulacion = new Date(); 
    return this.http.post<CargoUsuario>(this.url, cargo);
  }
  obtenerCargosPorUsuario(usuarioId: number): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}por-usuario/${usuarioId}`);
  }
  listarCargos(): Observable<CargoUsuario[]> {
    return this.http.get<CargoUsuario[]>(`${this.url}listar`);
  }
  getCargosByUserId(){
    return this.http.get<CargoUsuario>(`${this.url}`);   
  } 
}
