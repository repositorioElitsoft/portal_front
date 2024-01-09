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
  public eliminarExamen(examenId:any){
    return this.http.delete(`${this.url}/examen/eliminar/${examenId}`);
  }
  public obtenerExamen(examenId:any){
    return this.http.get(`${this.url}/examen/${examenId}`);
  }
  public obtenerExamenesActivos():Observable<any>{
    return this.http.get(`${this.url}/examen/usuario/`);
  } 
  public actualizarExamen(examen:any, examenId: number){
    return this.http.put(`${this.url}/examen/actualizar/${examenId}`,examen);
  }
  public agregarExamen(examen:any){
    return this.http.post(`${this.url}/examen/`,examen);
  }
  public obtenerPreguntasPorProducto(productoId: number): Observable<any> {
    return this.http.get(`${this.url}/pregunta/por-producto/${productoId}`);
  }
}