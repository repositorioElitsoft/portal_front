import { Component, OnInit } from '@angular/core';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-portal-view',
  templateUrl: './portal-view.component.html',
  styleUrls: ['./portal-view.component.css']
})
export class PortalViewComponent implements OnInit {
  exams: any;
  constructor(private preguntaService: PreguntaService,
    private userService: UserService,
    private herramientasService: HerramientasService) {
  }
  ngOnInit(): void {
  }
}