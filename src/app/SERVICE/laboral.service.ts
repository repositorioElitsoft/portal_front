import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LaboralService {

  url = "http://localhost:8080/laboral/"

  constructor(private http: HttpClient) { }

  guardarLaboral(laboral: Laboral, usrId: number, herrUsrId: number): Observable<Laboral> {
    const body = {
      laboral: laboral,
      usr_id: usrId,
      herr_usr_id: herrUsrId
    };

    return this.http.post<Laboral>(this.url, body);
  }

  obtenerHerramientasPorUsuario(usuarioId: number): Observable<Herramientas[]> {
    return this.http.get<Herramientas[]>(`${this.url}por-usuario/${usuarioId}`);
  }

  obtenerListaLaboralPorUsuario(usuarioId: number): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}listar-por-usuario/${usuarioId}`);
  }

  obtenerListaLaboral(): Observable<Laboral[]> {
    return this.http.get<Laboral[]>(`${this.url}listar`);
  }

  obtenerNombreProducto(prdId: number): Observable<string> {
    return this.http.get<string>(`${this.url}obtener-nombre-producto/${prdId}`);
  }
}

export interface Laboral{
  inf_lab_id?:number,
  inf_lab_crg_emp:string,
  inf_lab_emp:string,
  inf_lab_act:string,
  inf_lab_fec_ini:Date,
  inf_lab_fec_fin:Date,
  usr_id?:number,
  herr_usr_id?:number
  herramientas?: Herramientas[];
}

export interface Herramientas {
  herr_usr_id?: number;
  herr_usr_anos_exp: string;
  herr_usr_vrs: string;
  cat_prod_id?: number;
  prd_id?: number;
  cert_id?: number;
  nvl_id?: number;
  usr_id?: number;
  prd_nom: string;
  producto?: Producto;

}

export interface Producto {
  prd_id?: number;
  prd_nom: string;
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


