import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  baseUrl = 'http://localhost:8080';
  constructor(private HttpClient:HttpClient) { }

  public listarCuestionarios(){
    return this.HttpClient.get(`${this.baseUrl}/examen/`);
  }

  public agregarExamen(examen:any){
    return this.HttpClient.post(`${this.baseUrl}/examen/`,examen);
  }

  public eliminarExamen(exam_id:any){
    return this.HttpClient.delete(`${this.baseUrl}/examen/${exam_id}`);
  }

  public obtenerExamen(exam_id:any){
    return this.HttpClient.get(`${this.baseUrl}/examen/${exam_id}`);
  }

  public actualizarExamen(examen:any){
    return this.HttpClient.put(`${this.baseUrl}/examen/`,examen);
  }

  public listarExamenesDeUnaCategoria(cat_exam_id:any){
    return this.HttpClient.get(`${this.baseUrl}/examen/categoria/${cat_exam_id}`);
  }

  public obtenerExamenesActivos(){
    return this.HttpClient.get(`${this.baseUrl}/examen/activo`);
  }

  public obtenerExamenesActivosDeUnaCategoria(cat_exam_id:any){
    return this.HttpClient.get(`${this.baseUrl}/examen/categoria/activo/${cat_exam_id}`);
  }

}
