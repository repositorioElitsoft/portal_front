import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/producto.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {
  readonly url = `${environment.URL_HOST}/categoria-productos/`
  constructor(private http: HttpClient) { }
  getCategoriasDisponibles(): Observable <any> // metodo para listar las categorias disponibles
  {
    return this.http.get(this.url);
  }
  getProductosPorCategoria(categoriaId: number): Observable<Product[]> {
    const url = `${this.url}${categoriaId}productos`;
    return this.http.get<Product[]>(url);
  }
}