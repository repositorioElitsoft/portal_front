import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';
import { Pregunta, QuestionModalDataDTO } from 'src/app/interface/pregunta.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ExamenModalComponent>,
    private dialog: MatDialog, // Inyecta MatDialog
    @Inject(MAT_DIALOG_DATA) public data: QuestionModalDataDTO,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {
    this.buildForm();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

  }


  buildForm() {
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      answer: [{ value: '', disabled: true }, Validators.required],
      level: this.formBuilder.group({
        id: ['', Validators.required],
        description: ['',]
      })
    })
  }

  checkAnswersWritten() {
    if (this.form.get("option1")?.invalid ||
      this.form.get("option2")?.invalid ||
      this.form.get("option3")?.invalid ||
      this.form.get("option4")?.invalid) {
      this.form.get("answer")?.disable();
      return;
    }
    this.form.get("answer")?.enable();
  }

  formSubmit() {
    let question: any = this.form.value

    question.product = {
      id: this.data.product.id
    }

    if (!this.data.question) {
      console.log("Pregunta a guardar", question)
      this.preguntaService.guardarPregunta(question).subscribe({
        next: (response) => {
          console.log("Respuesta de guarda: ", response)
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.log("Error al guardar", err)
        }
      })
    }
    else {
      console.log("Pregunta a actualizar", question)

      this.preguntaService.actualizarPregunta(this.data.question.id ?? 0, question).subscribe({
        next: (response) => {
          console.log("Respuesta de actualizada: ", response)

          this.dialogRef.close(response);
        },
        error: (err) => {
          console.log("Error al actualizar", err)
        }
      })
    }

  }

  cerrarModal() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea cerrar esta ventana?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F57C27',
      cancelButtonColor: '#773e16',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialog.closeAll();
      }
    });
  }

}
