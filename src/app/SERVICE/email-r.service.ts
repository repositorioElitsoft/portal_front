import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailRService {

  readonly url = `${environment.URL_HOST}/emailR`

  constructor(private http: HttpClient) { }

  enviarCorreo(toEmail: string, motivo: string): Observable<any> {
    const body = { toEmail, motivo };
    return this.http.post(`${this.url}/enviar-correo`, body);
  }


}
