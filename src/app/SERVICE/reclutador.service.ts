import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclutadorService {
  baseUrl = 'http://localhost:8080';

  constructor(private HttpClient: HttpClient ) { }

  obtenerPerfilr(email: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseUrl}/usuarios/email/${email}`);
  }
}
