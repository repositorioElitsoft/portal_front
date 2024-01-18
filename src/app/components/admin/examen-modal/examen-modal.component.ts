import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pregunta } from 'src/app/interface/pregunta.interface';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ProductoService } from 'src/app/service/producto.service';
import { AddPreguntaComponent } from '../add-pregunta/add-pregunta.component';
import { Product } from 'src/app/interface/producto.interface';

@Component({
  selector: 'app-examen-modal',
  templateUrl: './examen-modal.component.html',
  styleUrls: ['./examen-modal.component.css']
})
export class ExamenModalComponent implements OnInit {


  private product!: Product

  constructor(
    public dialogRef: MatDialogRef<ExamenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductoService,
    private preguntaService: PreguntaService,
    private createOrEditQuestionDialog: MatDialog,

  ) {
  }
  ngOnInit(): void {


  }


  openAddQuestionDialog(): void {
    const dialogRef = this.createOrEditQuestionDialog.open(AddPreguntaComponent, {
      data: { question: null, product: this.data.product },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.data.questions.push(result)
    });
  }


  openUpdateQuestionDialog(question: Pregunta): void {
    const dialogRef = this.createOrEditQuestionDialog.open(AddPreguntaComponent, {
      data: { question: question, product: this.data.product },
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
          this.data.questions = this.data.questions.filter((p: any) => p.id !== preguntaId);
          console.log('Pregunta eliminada', preguntaId);
        },
        (error) => {
          console.log('Error al eliminar la pregunta', error);
        }
      )
    } else {
      this.data.questions = this.data.questions.filter((p: any) => p.id !== preguntaId);
    }
  }
}


