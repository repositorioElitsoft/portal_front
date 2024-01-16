import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/service/producto.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {
  examenId:any;
  examen:any = new Object();
  productIds: any;
  herramientas: any;
  lvl: any;
  productname: any;
  productid: any;
  lvlid: any;
  time:number = 3;
  puntosPorPregunta:number=2;
  constructor(
    private productService :ProductoService,
    private route:ActivatedRoute,
    private router:Router,
    private preguntaService:PreguntaService,
    private herramientasService : HerramientasService
    
  ) { }
  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['exam_id'];
    this.herramientasService.obtenerHerramientaPorId(this.examenId).subscribe({
      next: (herramienta) => {
        console.log("herramienta", herramienta);
      },
      error: (error) => {
        console.error(`Error al generar el examen para el producto:`, error);
      }


    })
    this.herramientasService.getCurrentUserTools().subscribe(
      (herramientas:any) => {
        if (herramientas && herramientas.length > 0) {
          this.herramientas = herramientas
          this.lvl= herramientas.map((herramienta:any) => herramienta.level.description);
          console.log("herramientas",this.herramientas);
          this.productIds = herramientas.map((herramienta:any) => herramienta.productVersion.name);
          this.productname = herramientas.map((herramienta:any) => herramienta.productVersion.product.name);
          this.productid = herramientas.map((herramienta:any) => herramienta.productVersion.product.id);
           this.productid = herramientas.map((herramienta:any) => herramienta.productVersion.product.id);
           this.lvlid= herramientas.map((herramienta:any) => herramienta.level.id);
          console.log('IDs de productos:', this.productIds);
          console.log('name de productos:', this.productname);
          console.log('level:', this.lvl);
          console.log('level:', this.lvl);
          this.generarExamen();
        } else {
          console.log('No se encontraron herramientas para el usuario.');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
  }
  empezarExamen(){
    Swal.fire({
        title: '¿Quieres comenzar el examen?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#515151',
        confirmButtonText: 'Empezar',
        confirmButtonColor: '#F57C27',
        icon: 'info',
        customClass: {
            popup: 'custom-border' 
        }
    }).then((result:any) => {
        if(result.isConfirmed){
            this.router.navigate(['/start/' + this.examenId]);
        }
    })
}
generarExamen(): void {
  const description = 'Descripción del examen';
  for (const productId of this.productIds) {
    this.preguntaService.generarExamen(description, productId).subscribe({
      next: (examQuestions) => {
        console.log(`Preguntas del examen para el producto ${productId}:`, examQuestions);
      },
      error: (error) => {
        console.error(`Error al generar el examen para el producto ${productId}:`, error);
      }
    });
  }
}
}
