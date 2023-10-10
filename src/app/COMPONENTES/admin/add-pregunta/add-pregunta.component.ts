import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/SERVICE/pregunta.service';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  exam_id:any;
  exam_titl:any;
  pregunta:any = {
    examen : {},
    prg: '',
    prg_opc1: '',
    prg_opc2: '',
    prg_opc3: '',
    prg_opc4: '',
    prg_resp: '',
    prg_ptje_prg: '',
  }

  constructor(
    private route:ActivatedRoute,
    private preguntaService:PreguntaService) { }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.params['exam_id'];
    this.exam_titl = this.route.snapshot.params['exam_titl'];
    this.pregunta.examen['exam_id'] = this.exam_id;
  }

  formSubmit(){
    if(this.pregunta.prg.trim() == '' || this.pregunta.prg == null){
      return;
    }
    if(this.pregunta.prg_opc1.trim() == '' || this.pregunta.prg_opc1 == null){
      return;
    }
    if(this.pregunta.prg_opc2.trim() == '' || this.pregunta.prg_opc2 == null){
      return;
    }
    if(this.pregunta.prg_opc3.trim() == '' || this.pregunta.prg_opc3 == null){
      return;
    }
    if(this.pregunta.prg_opc4.trim() == '' || this.pregunta.prg_opc4 == null){
      return;
    }
    if(this.pregunta.prg_resp.trim() == '' || this.pregunta.prg_resp == null){
      return;
    }
    if(this.pregunta.prg_ptje_prg.trim() == '' || this.pregunta.prg_ptje_prg == null){
      return;
    }

    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire('Pregunta guardada','La pregunta ha sido agregada con éxito','success');
        this.pregunta.prg = '';
        this.pregunta.prg_opc1 = '';
        this.pregunta.prg_opc2 = '';
        this.pregunta.prg_opc3 = '';
        this.pregunta.prg_opc4 = '';
        this.pregunta.prg_resp = '';
        this.pregunta.prg_ptje_prg = '';
      },(error) => {
        Swal.fire('Error','Error al guardar la pregunta en la base de datos','error');
        console.log(error);
      }
    )
  }

}
