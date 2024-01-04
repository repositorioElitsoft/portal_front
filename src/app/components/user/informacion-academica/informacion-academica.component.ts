import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Academica } from 'src/app/interface/academica.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicalReference } from 'src/app/interface/referencia-academica.interface';
import { AñadirEstudioComponent } from '../añadir-estudio/añadir-estudio.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarAcademicaComponent } from '../editar-academica/editar-academica.component';
import { AcademicaService } from 'src/app/service/academica.service';
@Component({
  selector: 'app-informacion-academica',
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {
  creationMode: boolean = false;
  academicas: Academica[] = []
  id: number | null | undefined = null
  form!: FormGroup
  minFecha: string = '';
  today: string;
  referenciasAcademicas: [] = [];
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private academicaService: AcademicaService, private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
      this.buildForm();
     }
  ngOnInit(): void {
    this.obtenerAcademicasGuardados();
  }
  get referenciaFormArray(){
    return this.form.get('referenciaAcademicas') as FormArray;
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      name: [''],
      institution: [''],
      email: [''],
      phone: ['']
    });
    this.referenciaFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciaFormArray.removeAt(index);
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      status: ["",[Validators.required]],
      titl: ["",[Validators.required]],
      university: ["",[Validators.required]],
      startDate: ["",[Validators.required]],
      endDate: ["",[Validators.required]],
      referenciaAcademicas: this.formBuilder.array([])
    });
  }
  redirectTo(){
    this.navigateToRoute('/user/informacion-laboral')
  }
  obtenerAcademicasGuardados() {
    this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
      next: (data: Academica[]) => {
        this.academicas = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  eliminarAcademica(id: number | undefined | null){
    this.academicaService.eliminarAcademica(id).subscribe({
      next:(res)=>{
        this.obtenerAcademicasGuardados();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AñadirEstudioComponent, {
      width: '600px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance?.AñadirEstudioComponent.subscribe(() => {
      this.obtenerAcademicasGuardados();
    });
  }
  editarAcademica(event: any) {
    const id = event.target.parentElement.id;
    if (id) {
      this.academicaService.obtenerAcademica(id).subscribe({
        next: (data) => {
          const dialogRef = this.dialog.open(EditarAcademicaComponent, {
            width: '800px',
            height: '700px',
            data:  data 
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.obtenerAcademicasGuardados();
          });
        },
        error: (error) => {
          console.error('Error al obtener datos:', error);
        }
      });
    } else {
      console.error('id es undefined o null');
    }
  }
  submitForm(event: Event) {
    event.preventDefault();
    const academicaNueva: Academica = {
      ...this.form.value,
      referenciaAcademicas: this.referenciaFormArray.value.map( (ref: AcademicalReference) => {
        return {
          id: ref.id,
          name: ref.name,
          institution: ref.institution,
          email: ref.email,
          phone: ref.phone,
        };
      })
    };
    this.academicaService.guardarAcademica(academicaNueva, this.id).subscribe(
      (academicaGuardada: Academica) => {
        this.creationMode = false;
        this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
          next:(data)=>{
            this.academicas = data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      (error) => {
        console.error('Error al guardar información laboral:', error);
      }
    );
  }
  goBack(){
    this.creationMode = false;
  }
}