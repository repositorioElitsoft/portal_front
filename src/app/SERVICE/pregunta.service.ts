import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../interface/pregunta.interface';
@Injectable({
  providedIn: 'root'
})

export class PreguntaService {

  readonly url = `${environment.URL_HOST}`
  constructor(private http: HttpClient) { }
  public listarPreguntasDelExamen(examenId: any) {
    return this.http.get(`${this.url}/pregunta/examen/todos/${examenId}`);
  }
  public guardarPregunta(pregunta: any) {
    return this.http.post(`${this.url}/pregunta/`, pregunta);
  }
  public eliminarPregunta(preguntaId: any) {
    return this.http.delete(`${this.url}/pregunta/eliminar/${preguntaId}`);
  }
  public actualizarPregunta(preguntaId: number, pregunta: any) {
    return this.http.put(`${this.url}/pregunta/actualizar/${preguntaId}`, pregunta);
  }
  public obtenerPregunta(preguntaId: any) {
    return this.http.get(`${this.url}/pregunta/${preguntaId}`);
  }


  public evaluarExamen(preguntas: any) {
    return this.http.post(`${this.url}/pregunta/evaluar-examen`, preguntas);
  }
  public generarExamen(description: string, productId: number): Observable<any> {
    const params = {
      description: description,
      productId: productId.toString()
    };
    console.log("description", description);
    console.log("product id", productId);
    return this.http.get<any>(`${this.url}/pregunta/generarExamen?description=${description}&productid=${productId}`);
  }
}

