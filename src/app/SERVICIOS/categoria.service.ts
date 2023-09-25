import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl = 'http://localhost:8080';
  constructor(private HttpClient: HttpClient ) { }

  public listarCategorias(){
    return this.HttpClient.get(`${this.baseUrl}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.HttpClient.post(`${this.baseUrl}/categoria/`,categoria);
  }

  eliminarCategoria(cat_exam_id: number) {
    return this.HttpClient.delete(`${this.baseUrl}/categoria/${cat_exam_id}`);
}

public obtenerCategoriaPorId(cat_exam_id: any) {
  return this.HttpClient.get(`${this.baseUrl}/categoria/${cat_exam_id}`);
}

public actualizarCategoria(categoria: any) {
  return this.HttpClient.put(`${this.baseUrl}/categoria/`, categoria);
}

}
