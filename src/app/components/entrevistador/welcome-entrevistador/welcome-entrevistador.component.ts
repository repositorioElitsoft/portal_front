import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome-entrevistador',
  templateUrl: './welcome-entrevistador.component.html',
  styleUrls: ['./welcome-entrevistador.component.css']
})
export class WelcomeEntrevistadorComponent implements OnInit {

authorities!: Set<string>;
constructor( private authService: AuthService, 
                                              ) { }


ngOnInit(){

this.authorities = this.authService.getAuthorities();
console.log('imprimiendo: ',this.authorities);

}




}
