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

  productId: number = 0;
  lvl: String = "";
  time: number = 3;
  puntosPorPregunta: number = 2;
  productName: String = ""

  constructor(
    private productService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private preguntaService: PreguntaService,
    private herramientasService: HerramientasService

  ) { }
  ngOnInit(): void {
    this.productName = this.route.snapshot.params['exam_id'];
    this.route.queryParams.subscribe(params => {
      this.productId = params['prod'];
      this.lvl = params['lvl'];
    });
  }
  empezarExamen() {
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.productId], {
          queryParams: {
            prod: this.productId,
            lvl: this.lvl,
            prodname: this.productName
          }
        });
      }
    })
  }

}
