import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {
  catId:any;
  examenes?:any;
  constructor(
    private route:ActivatedRoute,
    private productService:ProductoService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if(this.catId == 0){
        this.productService.obtenerExamenesActivos().subscribe(
          (data) => {
            this.examenes = data.filter((examen: any) =>{
              return examen.categoria !== null
            })
          },
          (error) => {
            console.log(error);
          }
        )
      }
      else{
        this.productService.obtenerExamenesActivos().subscribe(
          (data:any) => {
            this.examenes = data.filter((obj: any) => obj.categoria.categoriaId === this.catId);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    })
}
}