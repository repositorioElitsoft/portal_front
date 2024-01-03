import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargosElitsoft } from '../interface/cargos-elitsoft.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CargosElitsoftService {
  readonly url = `${environment.URL_HOST}/cargoselitsoft/`
  constructor(private http: HttpClient) { }
  obtenerListaCargosElitsoft(): Observable<CargosElitsoft[]> {
    return this.http.get<CargosElitsoft[]>(`${this.url}listar`);
  }
}