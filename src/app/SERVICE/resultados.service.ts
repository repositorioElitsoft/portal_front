import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  readonly url = `${environment.URL_HOST}`
  public loginStatusSubjec = new Subject<boolean>();
 
  constructor(private HttpClient:HttpClient,private route: ActivatedRoute, ) { }

  obtenerResultados(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/resultados/all`);
  }
  public guardarResultados(resultados:any){
    return this.HttpClient.post(`${this.url}/resultados/`, resultados);
    }
  public obtenerResultadosByUser(){
    return this.HttpClient.get(`${this.url}/resultados/`);
    }
}