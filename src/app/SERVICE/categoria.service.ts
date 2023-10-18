import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoriaExamen, CategoriaExamenCreateDTO } from '../interface/categoria-examen.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly url = `${environment.URL_HOST}categoria-productos`

  constructor(private http:HttpClient) { }

  public listarCategorias(): Observable<any>{
    return this.http.get(`${this.url}/categoria/`);
  }

  public agregarCategoria(categoria:CategoriaExamenCreateDTO){
    return this.http.post(`${this.url}/categoria/`,categoria);
  }

  public actualizarCategoria(categoria:CategoriaExamenCreateDTO, categoriaId: number){
    return this.http.put(`${this.url}/categoria/actualizar/${categoriaId}`,categoria);
  }

  public eliminarCategoria(categoriaId: number): Observable<any>{
    return this.http.delete(`${this.url}/categoria/eliminar/${categoriaId}`)
  }

  public getCategoria(categoriaId: number):Observable<any>{
    return this.http.get(`${this.url}/categoria/${categoriaId}`)
  }

}
