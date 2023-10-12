import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  baserUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listarPreguntasDelExamen(examenId:any){
    return this.http.get(`${this.baserUrl}/pregunta/examen/todos/${examenId}`);
  }

  public guardarPregunta(pregunta:any){
    return this.http.post(`${this.baserUrl}/pregunta/`,pregunta);
  }

  public eliminarPregunta(preguntaId:any){
    return this.http.delete(`${this.baserUrl}/pregunta/${preguntaId}`);
  }

  public actualizarPregunta(pregunta:any){
    return this.http.put(`${this.baserUrl}/pregunta/`,pregunta);
  }

  public obtenerPregunta(preguntaId:any){
    return this.http.get(`${this.baserUrl}/pregunta/${preguntaId}`);
  }

  public listarPreguntasDelExamenParaLaPrueba(examenId:any){
    return this.http.get(`${this.baserUrl}/pregunta/examen/todos/${examenId}`);
  }

  public evaluarExamen(preguntas:any){
    return this.http.post(`${this.baserUrl}/pregunta/evaluar-examen`,preguntas);
  }
  public guardarResultados(resultados:any){
    return this.http.post(`${this.baserUrl}/resultados/`, resultados);
    }
}
