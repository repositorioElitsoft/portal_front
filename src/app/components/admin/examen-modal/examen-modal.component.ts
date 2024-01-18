import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pregunta } from 'src/app/interface/pregunta.interface';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ProductoService } from 'src/app/service/producto.service';
import { AddPreguntaComponent } from '../add-pregunta/add-pregunta.component';

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
    private preguntaService: PreguntaService,
    private createOrEditQuestionDialog: MatDialog,

  ) { }
  ngOnInit(): void {

  }

  openDialog(question: Pregunta): void {
    const dialogRef = this.createOrEditQuestionDialog.open(AddPreguntaComponent, {
      data: question,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  cerrarDialog() {
    this.dialogRef.close();
  }
  deletePregunta(pregunta: Pregunta) {
    const preguntaId = pregunta.id;
    console.log("preguntaId", preguntaId)
    if (preguntaId) {
      this.preguntaService.eliminarPregunta(preguntaId).subscribe(
        (data) => {
          this.preguntas = this.preguntas.filter((p: any) => p.id !== preguntaId);
          console.log('Pregunta eliminada', preguntaId);
        },
        (error) => {
          console.log('Error al eliminar la pregunta', error);
        }
      )
    } else {
      this.preguntas = this.preguntas.filter((p: any) => p.id !== preguntaId);
    }
  }
}


