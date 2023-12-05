import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ExamenService } from 'src/app/service/examen.service';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {

  examenId:any;
  examen:any = new Object();

  constructor(
    private examenService:ExamenService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['exam_id'];
    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        this.examen = data;
      },
      (error) => {
        console.log(error);
      }
    )
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
            popup: 'custom-border' // Aplica la clase al cuadro de diálogo
        }
    }).then((result:any) => {
        if(result.isConfirmed){
            this.router.navigate(['/start/' + this.examenId]);
        }
    })
}

}
