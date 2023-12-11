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

  enviarCorreo(emails: string[], subject: string): Observable<any> {
    const body = { emails, subject };
    return this.http.post(`${this.url}/enviar-correo`, body);
  }


}
