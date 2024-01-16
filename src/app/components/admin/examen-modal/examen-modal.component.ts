import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pregunta } from 'src/app/interface/pregunta.interface';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-examen-modal',
  templateUrl: './examen-modal.component.html',
  styleUrls: ['./examen-modal.component.css']
})
export class ExamenModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExamenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public preguntas: Pregunta[],
    private productService: ProductoService,
    private preguntaService:PreguntaService
    
  ) {}
  ngOnInit(): void {

  }
  cerrarDialog() {
    this.dialogRef.close();
  }
  deletePregunta(pregunta: Pregunta) {
    const preguntaId = pregunta.id;
    console.log("preguntaId",preguntaId)
    if (preguntaId) {
      this.preguntaService.eliminarPregunta(preguntaId).subscribe(
        (data) => {
          this.preguntas = this.preguntas.filter((p:any) => p.id !== preguntaId);
          console.log('Pregunta eliminada', preguntaId);
        },
        (error) => {
          console.log('Error al eliminar la pregunta', error);
        }
      )
    } else {
      this.preguntas = this.preguntas.filter((p:any) => p.id !== preguntaId);
    }
  }
}


