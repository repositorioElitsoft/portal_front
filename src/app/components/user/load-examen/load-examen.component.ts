import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {
  catId:any;
  examenes?:any;
  productIds: number[] = [];
  productname: any;
  herramientas: any;
  lvl: any;
  constructor(
    private herramientasService:HerramientasService,
    private preguntaService:PreguntaService
  ) { }
  ngOnInit(): void {
    this.herramientasService.getCurrentUserTools().subscribe(
      (herramientas:any) => {
        if (herramientas && herramientas.length > 0) {
          this.herramientas = herramientas
          this.lvl= herramientas.map((herramienta:any) => herramienta.level.description);
          console.log("herramientas",this.herramientas);
          this.productIds = herramientas.map((herramienta:any) => herramienta.productVersion.name);
          this.productname = herramientas.map((herramienta:any) => herramienta.productVersion.product.name);
          console.log('IDs de productos:', this.productIds);
          console.log('name de productos:', this.productname);
          console.log('level:', this.lvl);
          
        } else {
          console.log('No se encontraron herramientas para el usuario.');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
  }
  
}












