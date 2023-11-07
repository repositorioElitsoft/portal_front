import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Academica } from 'src/app/interface/academica.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AñadirEstudioComponent } from '../shared/añadir-estudio/añadir-estudio.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarAcademicaComponent } from '../shared/editar-academica/editar-academica.component';

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

  constructor(private usuarioService: UsuarioService, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private academicaService: AcademicaService, private route: ActivatedRoute, private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
      this.buildForm();
     }

  ngOnInit(): void {
    this.obtenerAcademicasGuardados();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      inf_acad_est: ["",[Validators.required]],
      titl: ["",[Validators.required]],
      inf_acad_nom_esc: ["",[Validators.required]],
      inf_acad_fec_ini: ["",[Validators.required]],
      inf_acad_fec_fin: ["",[Validators.required]],
    });
  }

  redirectTo(){
    this.navigateToRoute('/user/informacion-laboral')
  }

  obtenerAcademicasGuardados(){
    this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
      next: (data) =>{
        this.academicas = data;
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  eliminarAcademica(id: number | undefined | null){
    this.academicaService.eliminarAcademica(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.obtenerAcademicasGuardados();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


  


  submitForm(event: Event) {

    event.preventDefault();

    const academicaNueva: Academica = this.form.value;
    console.log(academicaNueva)
    
    this.academicaService.guardarAcademica(academicaNueva, this.id).subscribe(
      (academicaGuardada: Academica) => {
        console.log('Información laboral guardada:', academicaGuardada);
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

  
  
  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditarAcademicaComponent , {
      width: '600px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  
}

