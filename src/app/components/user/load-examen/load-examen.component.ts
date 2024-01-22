import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { Herramientas } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {
  catId: any;
  examenes?: any;
  productIds: number[] = [];
  productname: any;
  herramientas: Herramientas[] = [];
  lvl: any;
  constructor(
    private herramientasService: HerramientasService,
    private preguntaService: PreguntaService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.herramientasService.getCurrentUserToolsForExams().subscribe(
      (herramientas: any) => {
        if (herramientas && herramientas.length > 0) {
          this.herramientas = herramientas
          this.lvl = herramientas.map((herramienta: any) => herramienta.level.description);
          console.log("herramientas", this.herramientas);
          this.productIds = herramientas.map((herramienta: any) => herramienta.productVersion.name);
          this.productname = herramientas.map((herramienta: any) => herramienta.productVersion.product.name);
          console.log('IDs de productos:', this.productIds);
          console.log('name de productos:', this.productname);
          console.log('level:', this.lvl);

          this.getExams();

        } else {
          console.log('No se encontraron herramientas para el usuario.');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
  }

  goToInstructions(tool: Herramientas) {

    this.router.navigate([`/portal-view/instrucciones/${tool.productVersion!.product!.name}`], {
      queryParams: {
        prod: tool.productVersion!.product!.id,
        lvl: tool.level?.description
      }
    });
  }

  getExams() {
    let productsWithMaxLevel = new Map();
    this.herramientas.forEach(h => {
      let productId = h.productVersion!.product!.id
      if (!productsWithMaxLevel.has(productId)) {
        productsWithMaxLevel.set(productId, (h.level?.id ?? 0));
      } else {
        let oldLvl = productsWithMaxLevel.get(productId)
        if (oldLvl < (h.level?.id ?? 0)) {
          productsWithMaxLevel.set(productId, h.level?.id ?? 0)
        }
      }
    })
    console.log("Herramientas antes de filter: ", this.herramientas)
    console.log("products with level: ", productsWithMaxLevel)

    this.herramientas = this.herramientas.filter(h => {
      const level = productsWithMaxLevel.get(h.productVersion!.product!.id)
      return level === h.level?.id
    })

    let herramientasDeNivelesBajos: Herramientas[] = []
    this.herramientas.forEach(h => {

      switch (h.level?.id) {
        case 3:
          herramientasDeNivelesBajos.push({
            id: h.id,
            yearsOfExperience: h.yearsOfExperience,
            user: h.user,
            employments: h.employments,
            productVersion: h.productVersion,
            level: { id: 2, description: "Medio" }
          })

          herramientasDeNivelesBajos.push({
            id: h.id,
            yearsOfExperience: h.yearsOfExperience,
            user: h.user,
            employments: h.employments,
            productVersion: h.productVersion,
            level: { id: 1, description: "Bajo" }
          })
          break;
        case 2:
          herramientasDeNivelesBajos.push({
            id: h.id,
            yearsOfExperience: h.yearsOfExperience,
            user: h.user,
            employments: h.employments,
            productVersion: h.productVersion,
            level: { id: 1, description: "Bajo" }
          })
          break;
      }
    })

    console.log(herramientasDeNivelesBajos)
    this.herramientas = this.herramientas.concat(herramientasDeNivelesBajos)

    this.herramientas.sort((a, b) => a.productVersion!.product!.name.localeCompare(b.productVersion!.product!.name));
    console.log("Herramientas después de filter: ", this.herramientas)
  }

}












