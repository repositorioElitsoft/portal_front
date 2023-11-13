import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Academica } from 'src/app/interface/academica.interface';

@Component({
  selector: 'app-informacion-academica',
  templateUrl: './editar-academica.component.html',
  styleUrls: ['./editar-academica.component.css']
})
export class EditarAcademicaComponent implements OnInit {
  @Output() EditarAcademicaComponent: EventEmitter<void> = new EventEmitter<void>();

  creationMode: boolean = false;

  academicas: Academica[] = [];
  id: number | null | undefined = null;

  form!: FormGroup;
  minFecha: string = '';
  today: string;
  navigateToRoute: any;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private academicaService: AcademicaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerAcademicasGuardados();
  }

  startDate = new Date(2020, 0, 1);

  private buildForm() {
    this.form = this.formBuilder.group({
      inf_acad_est: ["", [Validators.required]],
      titl: ["", [Validators.required]],
      inf_acad_nom_esc: ["", [Validators.required]],
      inf_acad_fec_ini: ["", [Validators.required]],
      inf_acad_fec_fin: ["", [Validators.required]],
    });
  }

  redirectTo() {
    this.navigateToRoute('/user/informacion-laboral');
  }

  obtenerAcademicasGuardados() {
    this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
      next: (data) => {
        this.academicas = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditarAcademicaComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  eliminarAcademica(id: number | undefined | null) {
    this.academicaService.eliminarAcademica(id).subscribe({
      next: (res) => {
        console.log(res);
        this.obtenerAcademicasGuardados();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goBack() {
    // Cierra todas las ventanas de diálogo abiertas
    this.dialog.closeAll();
  }

  editarAcademica(id: number | undefined | null) {
    this.id = id;
    const academicaToEdit = this.academicas.find(academica => academica.inf_acad_id === this.id);

    if (academicaToEdit) {
      // Formatear las fechas a 'yyyy-MM-dd'
      const fechaInicio = new Date(academicaToEdit.inf_acad_fec_ini).toISOString().split('T')[0];
      const fechaFin = new Date(academicaToEdit.inf_acad_fec_fin).toISOString().split('T')[0];

      this.form.patchValue({
        inf_acad_est: academicaToEdit.inf_acad_est,
        inf_acad_nom_esc: academicaToEdit.inf_acad_nom_esc,
        titl: academicaToEdit.titl,
        inf_acad_fec_ini: fechaInicio,
        inf_acad_fec_fin: fechaFin,
      });

      this.creationMode = !this.creationMode;
    }
  }

  addExperienceRow() {
    this.id = null;
    this.form.reset();
    // Asegúrate de que creationMode solo se establezca en true al agregar un nuevo campo
    if (!this.creationMode) {
      this.creationMode = true;
    }
  }

  submitForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      // Formatear las fechas antes de enviar al servidor
      const fechaInicioFormateada = new Date(this.form.value.inf_acad_fec_ini).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.inf_acad_fec_fin).toISOString().split('T')[0];

      const academicaNueva: Academica = {
        ...this.form.value,
        inf_acad_fec_ini: fechaInicioFormateada,
        inf_acad_fec_fin: fechaFinFormateada
      };

      this.academicaService.guardarAcademica(academicaNueva, this.id).subscribe(
        (academicaGuardada: Academica) => {
          console.log('Información académica guardada:', academicaGuardada);
          this.creationMode = false;
          this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
            next: (data) => {
              this.academicas = data;
              // Cierra el diálogo después de guardar los cambios
              this.EditarAcademicaComponent.emit();
              this.dialog.closeAll();
            },
            error: (err) => {
              console.log(err);
            }
          });

        },
        (error) => {
          console.error('Error al guardar información académica:', error);
          console.log('Error detallado:', error);
        }
      );
    } else {
      // Muestra un mensaje de error o realiza alguna otra acción si el formulario no está completo.
      console.log('Por favor, complete todas las casillas del formulario.');

      // Agregar un registro de los errores en el formulario
      console.log('Errores en el formulario:', this.form.errors);

      // Agregar un registro del estado del formulario
      console.log('Estado del formulario:', this.form.value);
    }
  }
}
