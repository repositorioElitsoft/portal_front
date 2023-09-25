import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  baseUrl = 'http://localhost:8080';
  constructor(private HttpClient:HttpClient) { }

  public listarPreguntasDelExamen(exam_id:any){
    return this.HttpClient.get(`${this.baseUrl}/pregunta/examen/todos/${exam_id}`);
  }

  public guardarPregunta(pregunta:any){
    return this.HttpClient.post(`${this.baseUrl}/pregunta/`,pregunta);
  }

  public eliminarPregunta(prg_id:any){
    return this.HttpClient.delete(`${this.baseUrl}/pregunta/${prg_id}`);
 }

 public actualizarPregunta(pregunta:any){
  return this.HttpClient.put(`${this.baseUrl}/pregunta/`,pregunta);
}

public obtenerPregunta(prg_id:any){
  return this.HttpClient.get(`${this.baseUrl}/pregunta/${prg_id}`);
}

public listarPreguntasDelExamenParaLaPrueba(exam_id:any){
  return this.HttpClient.get(`${this.baseUrl}/pregunta/examen/todos/${exam_id}`);
}

public evaluarExamen(preguntas:any){
  return this.HttpClient.post(`${this.baseUrl}/pregunta/evaluar-examen`,preguntas);
}
}
