import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaExamen, CategoriaExamenCreateDTO } from '../interface/categoria-examen.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baserUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listarCategorias(): Observable<any>{
    return this.http.get(`${this.baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:CategoriaExamenCreateDTO){
    return this.http.post(`${this.baserUrl}/categoria/`,categoria);
  }

  public actualizarCategoria(categoria:CategoriaExamenCreateDTO, categoriaId: number){
    return this.http.put(`${this.baserUrl}/categoria/actualizar/${categoriaId}`,categoria);
  }

  public eliminarCategoria(categoriaId: number): Observable<any>{
    return this.http.delete(`${this.baserUrl}/categoria/eliminar/${categoriaId}`)
  }

  public getCategoria(categoriaId: number):Observable<any>{
    return this.http.get(`${this.baserUrl}/categoria/${categoriaId}`)
  }

}
