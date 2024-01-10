import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  readonly url = `${environment.URL_HOST}`
  constructor(private http:HttpClient) { }
  public listarPreguntasDelExamen(examenId:any){
    return this.http.get(`${this.url}/pregunta/examen/todos/${examenId}`);
  }
  public guardarPregunta(pregunta:any){
    return this.http.post(`${this.url}/pregunta/`,pregunta);
  }
  public eliminarPregunta(preguntaId:any){
    return this.http.delete(`${this.url}/pregunta/eliminar/${preguntaId}`);
  }
  public actualizarPregunta(preguntaId: number, pregunta: any){
    return this.http.put(`${this.url}/pregunta/actualizar/${preguntaId}`, pregunta);
  }
  public obtenerPregunta(preguntaId:any){
    return this.http.get(`${this.url}/pregunta/${preguntaId}`);
  }
  public obtenerResultadosByUser(idUser:any){
    return this.http.get(`${this.url}/resultados/${idUser}`);
  }
  public listarPreguntasDelExamenParaLaPrueba(examenId:any){
    return this.http.get(`${this.url}/pregunta/examen/todos/${examenId}`);
  }
  public evaluarExamen(preguntas:any){
    return this.http.post(`${this.url}/pregunta/evaluar-examen`,preguntas);
  }
  public guardarResultados(resultados:any){
    return this.http.post(`${this.url}/resultados/`, resultados);
    }
  
  
}