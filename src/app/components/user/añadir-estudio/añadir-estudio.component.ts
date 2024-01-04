import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Academical } from 'src/app/interface/academical.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-añadir-estudio',
  templateUrl: './añadir-estudio.component.html',
  styleUrls: ['./añadir-estudio.component.css'],
})
export class AñadirEstudioComponent implements OnInit {
[x: string]: any;
  @Output() AñadirEstudioComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  academicas: Academical[] = [];
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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
      this.today = new Date().toISOString().split('T')[0];
      this.buildForm();
    }
    ngOnInit(): void {
      if (this.data && this.data.academica) {
        this.editarAcademica(this.data.academica);
      } else {
      
        this.creationMode = true;
      }
    }
    ngAfterViewInit(): void {
      if (this.data && this.data.academica) {
        Promise.resolve().then(() => this.editarAcademica(this.data.academica));
      }
    }
  startDate = new Date(2020, 0, 1);
  private buildForm(academica: Academical | null = null) {
    this.form = this.formBuilder.group({
      status: [academica ? academica.status : "", [Validators.required]],
      degree: [academica ? academica.degree : "", [Validators.required]],
      university: [academica ? academica.university : "", [Validators.required]],
      startDate: [academica ? academica.startDate : "", [Validators.required]],
      endDate: [academica ? academica.endDate : "", [Validators.required]],
      academicalReference: this.formBuilder.array([])
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
      console.log('Error al obtener academicas:', err);
    },
  });
}
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AñadirEstudioComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  eliminarAcademica(id: number | undefined | null) {
    this.academicaService.eliminarAcademica(id).subscribe({
      next: (res) => {
        this.obtenerAcademicasGuardados();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goBack() {
    this.dialog.closeAll();
  }
  editarAcademica(academica: Academical) {
    if (academica && academica.id) {
      this.id = academica.id;
      this.form.patchValue({
        status: academica.status,
        university: academica.university,
        degree: academica.degree,
        startDate: academica.startDate,
        endDate: academica.endDate,
      });
      this.creationMode = false;
    } else {
      this.creationMode = true;
      this.form.reset();
    }
  }
  get referenciaFormArray(){
    return this.form.get('academicalReference') as FormArray;
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      ref_acad_nom: [''],
      ref_acad_ins: [''],
      ref_acad_email: [''],
      ref_acad_tel: ['']
    });
    this.referenciaFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciaFormArray.removeAt(index);
  }
  submitForm(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const fechaInicioFormateada = new Date(
        this.form.value.startDate
      ).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(
        this.form.value.endDate
      ).toISOString().split('T')[0];
      const academicaNueva: Academical = {
        ...this.form.value,
        startDate: fechaInicioFormateada,
        endDate: fechaFinFormateada,
      };
      this.academicaService
        .guardarAcademica(academicaNueva, this.id)
        .subscribe(
          (academicaGuardada: Academical) => {
            this.creationMode = false;
            this.academicaService
              .obtenerListaAcademicasPorUsuario()
              .subscribe({
                next: (data) => {
                  this.academicas = data;
                  this.AñadirEstudioComponent.emit();
                  this.dialog.closeAll();
                },
                error: (err) => {
                  console.log(err);
                },
              });
          },
          (error) => {
            console.error('Error al guardar información académica:', error);
          }
        );
    } else {
    }
  }
}
