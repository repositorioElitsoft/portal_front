import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/productos";

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/`);
  }

  // Método para obtener productos por categoría
  obtenerProductosPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/producto-por-categoria/${categoriaId}`);
  }

}

export interface Producto {
  prd_id?:number
  prd_nom:string
  cat_prod_id:number
}
