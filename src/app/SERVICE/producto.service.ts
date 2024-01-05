import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../interface/producto.interface';
import {ProductVersion} from '../interface/version-producto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly url = `${environment.URL_HOST}`
  constructor(private http: HttpClient) { }
  obtenerTodosLosProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productos/`);
  }
  getProductsByCategory(categoriaId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productos/producto-por-categoria/${categoriaId}`);
  }
  getVersionByProduct(productId: number): Observable<ProductVersion[]> {
    return this.http.get<ProductVersion[]>(`${this.url}/versiones-producto/por-producto/${productId}`);
  }
}