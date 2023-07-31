import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/api/usuarios";

  constructor(private http: HttpClient) { }

  saveUsuario(usuario: Usuario):Observable<any>
  {
    return this.http.post(this.url, usuario);
  }
}

export interface Usuario {
  id_usuario:string
  usr_rut:string
  usr_nom:string
  usr_ap_pat:string
  usr_ap_mat:string
  usr_email:string
  usr_pass:string
  usr_tel:string
  usr_url_link:string
  pais_id:string
}
