import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Implementamos nuestro servicio
  url = "http://localhost:8080/usuarios/";

  constructor(private http: HttpClient) { }

  saveUsuario(usuario: Usuario): Observable<any> {
    // Asegurarse de que la propiedad "pais" esté configurada correctamente
    if (!usuario.pais || !usuario.pais.pais_id) {
      // Manejar el caso en que no se haya configurado el país
      throw new Error('El objeto Usuario debe tener la propiedad "pais" correctamente configurada.');
    }

    return this.http.post(this.url, usuario);
  }

  obtenerUsuarioPorId(usuarioId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}${usuarioId}`);
  }

}


export interface Usuario {
  usr_id?:number
  usr_rut:string
  usr_nom:string
  usr_ap_pat:string
  usr_ap_mat:string
  usr_email:string
  usr_pass:string
  usr_tel:string
  usr_url_link:string
  pais_nom: string;
  pais?: Pais; // Agregar esta línea para definir la propiedad pais
}

export interface Pais {
  pais_id?: bigint;
  pais_nom: string;
}
