import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';
import { Pregunta } from 'src/app/interface/pregunta.interface';
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
    @Inject(MAT_DIALOG_DATA) public pregunta: Pregunta,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService) {
    this.buildForm();
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
      answer: ['', Validators.required],
      level: ['', Validators.required]
    })
  }

  formSubmit() {
    this.pregunta.answer = this.form.value.answer
    this.pregunta.content = this.form.value.content
    this.pregunta.level.id = this.form.value.level
    this.pregunta.option1 = this.form.value.option1
    this.pregunta.option2 = this.form.value.option2
    this.pregunta.option3 = this.form.value.option3
    this.pregunta.option4 = this.form.value.option4

    if (!this.pregunta.id) {
      this.preguntaService.guardarPregunta(this.pregunta).subscribe({
        next: (response) => {
          console.log("Respuesta de guarda: ", response)
          this.dialogRef.close();
        },
        error: (err) => {
          console.log("Error al guardar", err)
        }
      })
    }
    else {
      this.preguntaService.actualizarPregunta(this.pregunta.id, this.pregunta).subscribe({
        next: (response) => {
          console.log("Respuesta de actualizada: ", response)
          this.dialogRef.close();
        },
        error: (err) => {
          console.log("Error al actualizar", err)
        }
      })
    }

  }

}
