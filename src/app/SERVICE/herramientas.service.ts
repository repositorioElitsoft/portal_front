import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from './producto.service';


@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  url = "http://localhost:8080/herramientas/"

  constructor(private http: HttpClient) { }

  guardarHerramienta(herramienta: Herramientas, usuarioId: number): Observable<Herramientas> {
    return this.http.post<Herramientas>(`${this.url}?usr_id=${usuarioId}`, herramienta);
  }

  obtenerHerramientaPorId(herramientaId: number): Observable<Herramientas> {
    return this.http.get<Herramientas>(`${this.url}${herramientaId}`);
  }


  obtenerHerramientasConProductosPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario-con-productos/${usuarioId}`);
  }

  listarHerramientas(): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}lista-herramientas`);
  }
}

export interface Herramientas {
  herr_usr_id?: number;
  herr_usr_anos_exp: string;
  herr_usr_vrs: string;
  cat_prod_id?: number;
  prd_id?: number;
  cert_id?: number;
  nvl_id?: number;
  usr_id?: number;
  prd_nom?: string;
  producto?: Producto; // Agrega esta línea para definir la propiedad producto
}
