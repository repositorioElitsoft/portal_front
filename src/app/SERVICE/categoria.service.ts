import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly url = `${environment.URL_HOST}categoria-productos`

  constructor(private http:HttpClient) { }

  public listarCategorias(){
    return this.http.get(`${this.url}/categoria/`);
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${this.url}/categoria/`,categoria);
  }

  public elimarCategoria(){
    //TODO
  }

}
