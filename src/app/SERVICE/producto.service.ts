import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from '../interface/producto.interface';
import { VersionProducto } from '../interface/version.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  readonly url = `${environment.URL_HOST}`

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos/`);
  }

  // Método para obtener productos por categoría
  obtenerProductosPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/productos/producto-por-categoria/${categoriaId}`);
  }

  getVersionByProduct(productId: number): Observable<VersionProducto[]> {
    return this.http.get<VersionProducto[]>(`${this.url}/versiones-producto/por-producto/${productId}`);
  }

}
