import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Academica } from 'src/app/interface/academica.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AñadirEstudioComponent } from '../shared/añadir-estudio/añadir-estudio.component';
import { MatDialog } from '@angular/material/dialog';

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

  obtenerAcademicasGuardados() {
    this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
      next: (data: Academica[]) => {
        console.log('Datos recibidos:', data); // Inspeccionar los datos recibidos
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

 
  editarAcademica(event: any) {
    console.log('Evento recibido:', event); // Verificar el evento recibido
  
    // Intentando obtener el ID del elemento padre del elemento que desencadenó el evento
    const inf_acad_id = event.target.parentElement.id;
    console.log('inf_acad_id:', inf_acad_id); // Verificar el ID obtenido
  
    if (inf_acad_id) {
      console.log('ID definido, solicitando datos...'); // Confirmar que el ID está definido
  
      this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
        next: (data) => {
          console.log('Data llegada:', data); // Inspeccionar los datos recibidos del servicio
          const inf_acad_id = data;
  
          const dialogRef = this.dialog.open(AñadirEstudioComponent, {
            width: '800px', 
            height: '700px',
            data: data
          });
  
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`); // Resultado después de cerrar el diálogo
          });
        },
        error: (error) => {
          console.error('Error al obtener datos:', error); // Capturar y mostrar errores
        }
      });
    } else {
      console.error('inf_acad_id es undefined o null'); // Manejar el caso de que inf_acad_id no esté definido
    }
  }
  



}