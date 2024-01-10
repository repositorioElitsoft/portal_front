import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public preguntas: any,
    private productService: ProductoService,
    private preguntaService:PreguntaService
    
  ) {}
  ngOnInit(): void {

  }
  cerrarDialog() {
    this.dialogRef.close();
  }
  deletePregunta(index: number) {
    const preguntaId = this.preguntas.value[index].preguntaId;
    console.log("preguntaId",preguntaId)
    if (preguntaId) {
      this.preguntaService.eliminarPregunta(preguntaId).subscribe(
        (data) => {
          this.preguntas.removeAt(index);
          console.log('Pregunta eliminada', preguntaId);
        },
        (error) => {
          console.log('Error al eliminar la pregunta', error);
        }
      )
    } else {
      this.preguntas.removeAt(index);
    }
  }
  
  
  

 
  






}


