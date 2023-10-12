import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly url = `${environment.URL_HOST}`

  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any>{
    const body = { username, password };
    return this.http.post(`${this.url}/login`, body);
  };

  getUser(){
    //TODO PENDIENTE
    return
  }

}
