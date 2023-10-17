import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interface/categoria.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baserUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listarCategorias(): Observable <Categoria[]>{
    return this.http.get<Categoria[]>(`${this.baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${this.baserUrl}/categoria/`,categoria);
  }

  public elimarCategoria(){
    //TODO
  }

}
