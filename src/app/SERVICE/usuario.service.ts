import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/user.interface'


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
      //TODO: Verificar pais en el formulario, mandar id 1      
      // Manejar el caso en que no se haya configurado el país
      throw new Error('El objeto Usuario debe tener la propiedad "pais" correctamente configurada.');
    }

    return this.http.post(this.url, usuario);
  }

  
  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(this.url, usuario);
  }

  obtenerUsuarioPorId(usuarioId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}${usuarioId}`);
  }

  obtenerUsuarioGuardado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}`);
  }
}