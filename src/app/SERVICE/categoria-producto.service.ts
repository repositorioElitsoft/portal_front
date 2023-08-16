import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/categoria-productos/";

  constructor(private http: HttpClient) { }

  getCategoriasDisponibles(): Observable <any> // metodo para listar las categorias disponibles
  {
    return this.http.get(this.url);
  }

  getProductosPorCategoria(categoriaId: number): Observable<Producto[]> {
    const url = `${this.url}${categoriaId}/productos`;
    return this.http.get<Producto[]>(url);
  }
}

export interface CategoriaProducto{
  cat_prod_id:number,
  cat_prod_nom:string

}
