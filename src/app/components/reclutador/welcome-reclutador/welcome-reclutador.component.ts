import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome-reclutador',
  templateUrl: './welcome-reclutador.component.html',
  styleUrls: ['./welcome-reclutador.component.css']
})
export class WelcomeReclutadorComponent implements OnInit {

  authorities!: Set<string>;
  constructor(private authService: AuthService,
  ) { }


  ngOnInit() {

    this.authorities = this.authService.getAuthorities();
    console.log('imprimiendo: ', this.authorities);

  }




}
