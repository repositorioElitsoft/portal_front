import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baserUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listarCategorias(){
    return this.http.get(`${this.baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${this.baserUrl}/categoria/`,categoria);
  }

  public elimarCategoria(){
    //TODO
  }

}
