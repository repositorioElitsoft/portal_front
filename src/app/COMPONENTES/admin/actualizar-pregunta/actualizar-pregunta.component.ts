import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/SERVICIOS/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent implements OnInit {

  prg_id:any = 0;
  pregunta:any;
  examen:any;

  constructor(
    private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.prg_id = this.route.snapshot.params['prg_id'];
    this.preguntaService.obtenerPregunta(this.prg_id).subscribe(
      (data:any) => {
        this.pregunta = data;
        console.log(this.pregunta);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public actualizarDatosDeLaPregunta(){
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire('Pregunta actualizada','La pregunta ha sido actualizada con éxito','success').then((e) => {
          this.router.navigate(['/admin/view-examen-preguntas/'+this.pregunta.examen.exam_id+'/'+this.pregunta.examen.exam_titl]);
        })
      }
    )
  }
}
