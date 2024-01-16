import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ValidarMailService {
  readonly url = `${environment.URL_HOST}/users/verify/`
  constructor(private http: HttpClient, private route: ActivatedRoute,) { }
  verificarEmail(): Observable<any> {
    return this.route.queryParamMap.pipe(
      map(params => params.get("code")),
      switchMap(cod => {
        if (cod) {
          return this.http.post(this.url, { code: cod });
        } else {
          return of('Code not available');
        }
      })
    );
  }
}