import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarMailService {
  
  url = "http://localhost:8080/usuarios/verificar/";

  constructor(private http: HttpClient,private route: ActivatedRoute,) {  }
    
 
  verificarEmail(): Observable<any>{
  
    const cod = this.route.snapshot.queryParamMap.get("code");

    return this.http.post(this.url,{code: cod});
  }
}
