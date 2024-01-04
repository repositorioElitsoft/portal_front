import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class observationCategoryService {
  readonly url = `${environment.URL_HOST}/catobs/`
  constructor(private http: HttpClient) { }
  getCategoriaPorId(catObsId: number): Observable<any> {
    const url = `${this.url}${catObsId}`;
    return this.http.get<any>(url);
  }
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
