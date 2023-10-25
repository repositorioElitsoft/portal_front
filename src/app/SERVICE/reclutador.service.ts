import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclutadorService {

  readonly url = `${environment.URL_HOST}`

  constructor(private HttpClient: HttpClient ) { }

  obtenerPerfilr(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.url}/usuarios/email/${email}`);
  }
}
