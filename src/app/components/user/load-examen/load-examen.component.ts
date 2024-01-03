import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/service/examen.service';
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
    private examenService:ExamenService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if(this.catId == 0){
        this.examenService.obtenerExamenesActivos().subscribe(
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
        this.examenService.obtenerExamenesActivos().subscribe(
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