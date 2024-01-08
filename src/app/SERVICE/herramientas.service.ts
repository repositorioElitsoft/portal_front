import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreateToolDTO, Herramientas, ToolDTO } from '../interface/herramientas.interface';
import { HerramientaData } from '../interface/herramienta-data.interface';
import { environment } from 'src/environments/environment';
import { Certification } from '../interface/certificacion.interface';
@Injectable({
  providedIn: 'root'
})
export class HerramientasService {
  readonly url = `${environment.URL_HOST}/herramientas/`
  constructor(private http: HttpClient) { }
  createTool(tool: CreateToolDTO): Observable<CreateToolDTO> {
    return this.http.post<CreateToolDTO>(this.url, tool);
  }

  addToolCertification(toolId: number, certificacion: FormData): Observable<any>{
    return this.http.post<any>(`${this.url}${toolId}/certification`, certificacion)
  }

  deleteToolCertification(tooldId: number,certificationId: number | undefined): Observable<ToolDTO>{
    return this.http.delete<ToolDTO>(`${this.url}${tooldId}/certification/${certificationId}`)
  }


  obtenerHerramientaPorId(herramientaId: number): Observable<Herramientas> {
    return this.http.get<Herramientas>(`${this.url}${herramientaId}`);
  }
  obtenerHerramientasConProductosPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario-con-productos/${usuarioId}`);
  }
  listarHerramientas(): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}lista-herramientas`);
  }
  getCurrentUserTools(): Observable<ToolDTO[]> {
    return this.http.get<ToolDTO[]>(this.url);
  }

  deleteTool(toolId: number): Observable<ToolDTO>{
    return this.http.delete<ToolDTO>(`${this.url}${toolId}`)
  }
}