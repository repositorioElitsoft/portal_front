import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Examen } from '../interface/examen.interface';


@Injectable({
  providedIn: 'root'
})
export class ExamenService {


  readonly url = `${environment.URL_HOST}`

  constructor(private http:HttpClient) { }

  public listarCuestionarios():Observable<any>{
    return this.http.get(`${this.url}/examen/`);
  }

  public agregarExamen(examen:any){
    return this.http.post(`${this.url}/examen/`,examen);
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${this.url}/examen/eliminar/${examenId}`);
  }

  public obtenerExamen(examenId:any){
    return this.http.get(`${this.url}/examen/${examenId}`);
  }

  public actualizarExamen(examen:any, examenId: number){
    return this.http.put(`${this.url}/examen/actualizar/${examenId}`,examen);
  }

  public listarExamenesDeUnaCategoria(categoriaId:any){
    return this.http.get(`${this.url}/examen/categoria/${categoriaId}`);
  }

  public obtenerExamenesActivos():Observable<any>{
    return this.http.get(`${this.url}/examen/usuario/`);
  }

  public obtenerExamenesActivosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${this.url}/examen/categoria/${categoriaId}`);
  }
}
