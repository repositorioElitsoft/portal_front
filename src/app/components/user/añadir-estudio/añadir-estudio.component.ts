import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UserService } from 'src/app/service/user.service';
import { Academica } from 'src/app/interface/academica.interface';
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
  academicas: Academica[] = [];
  id: number | null | undefined = null;
  form!: FormGroup;
  minFecha: string = '';
  today: string;
  navigateToRoute: any;
  constructor(
    private userService: UserService,
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
  private buildForm(academica: Academica | null = null) {
    this.form = this.formBuilder.group({
      inf_acad_est: [academica ? academica.inf_acad_est : "", [Validators.required]],
      titl: [academica ? academica.titl : "", [Validators.required]],
      inf_acad_nom_esc: [academica ? academica.inf_acad_nom_esc : "", [Validators.required]],
      inf_acad_fec_ini: [academica ? academica.inf_acad_fec_ini : "", [Validators.required]],
      inf_acad_fec_fin: [academica ? academica.inf_acad_fec_fin : "", [Validators.required]],
      referenciaAcademicas: this.formBuilder.array([])
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
  editarAcademica(academica: Academica) {
    if (academica && academica.inf_acad_id) {
      this.id = academica.inf_acad_id;
      this.form.patchValue({
        inf_acad_est: academica.inf_acad_est,
        inf_acad_nom_esc: academica.inf_acad_nom_esc,
        titl: academica.titl,
        inf_acad_fec_ini: academica.inf_acad_fec_ini,
        inf_acad_fec_fin: academica.inf_acad_fec_fin,
      });
      this.creationMode = false;
    } else {
      this.creationMode = true;
      this.form.reset();
    }
  }
  get referenciaFormArray(){
    return this.form.get('referenciaAcademicas') as FormArray;
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
        this.form.value.inf_acad_fec_ini
      ).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(
        this.form.value.inf_acad_fec_fin
      ).toISOString().split('T')[0];
      const academicaNueva: Academica = {
        ...this.form.value,
        inf_acad_fec_ini: fechaInicioFormateada,
        inf_acad_fec_fin: fechaFinFormateada,
      };
      this.academicaService
        .guardarAcademica(academicaNueva, this.id)
        .subscribe(
          (academicaGuardada: Academica) => {
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
