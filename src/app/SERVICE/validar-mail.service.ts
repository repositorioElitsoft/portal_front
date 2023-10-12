import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarMailService {

  readonly url = `${environment.URL_HOST}/usuarios/verificar/`

  constructor(private http: HttpClient,private route: ActivatedRoute,) {  }


  verificarEmail(): Observable<any>{

    const cod = this.route.snapshot.queryParamMap.get("code");

    return this.http.post(this.url,{code: cod});
  }
}
