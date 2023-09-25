import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/SERVICIOS/pregunta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit {

  exam_id:any;
  exam_titl:any;
  preguntas:any = [];

  constructor(private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    ) { }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.params['exam_id'];
    this.exam_titl = this.route.snapshot.params['exam_titl'];
    this.preguntaService.listarPreguntasDelExamen(this.exam_id).subscribe(
      (data:any) => {
        console.log(data);
        this.preguntas = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

   eliminarPregunta(prg_id:any){
   Swal.fire({
     title:'Eliminar pregunta',
       text:'¿Estás seguro , quieres eliminar esta pregunta?',
       icon:'warning',
       showCancelButton:true,
       confirmButtonColor:'#3085d6',
       cancelButtonColor:'#d33',
       confirmButtonText:'Eliminar',
       cancelButtonText:'Cancelar'
     }).then((resultado) => {
       if(resultado.isConfirmed){
         this.preguntaService.eliminarPregunta(prg_id).subscribe(
           (data) => {
            Swal.fire({
              title: 'Pregunta eliminada',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
             this.preguntas = this.preguntas.filter((pregunta:any) => pregunta.prg_id != prg_id);
           },
           (error) => {
            Swal.fire({
              title: 'Error al eliminar la pregunta',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false
            });
             console.log(error);
           }
         )
       }
     })
   }

}
