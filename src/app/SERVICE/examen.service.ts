import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  baserUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(`${this.baserUrl}/examen/`);
  }

  public agregarExamen(examen:any){
    return this.http.post(`${this.baserUrl}/examen/`,examen);
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${this.baserUrl}/examen/${examenId}`);
  }

  public obtenerExamen(examenId:any){
    return this.http.get(`${this.baserUrl}/examen/${examenId}`);
  }

  public actualizarExamen(examen:any){
    return this.http.put(`${this.baserUrl}/examen/`,examen);
  }

  public listarExamenesDeUnaCategoria(categoriaId:any){
    return this.http.get(`${this.baserUrl}/examen/categoria/${categoriaId}`);
  }

  public obtenerExamenesActivos(){
    return this.http.get(`${this.baserUrl}/examen/activo`);
  }

  public obtenerExamenesActivosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${this.baserUrl}/examen/categoria/activo/${categoriaId}`);
  }
}
