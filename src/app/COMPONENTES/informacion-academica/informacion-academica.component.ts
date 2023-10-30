import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from '../../interface/user.interface'
import { Academica } from 'src/app/interface/academica.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  goBack(){
    this.creationMode = false;
  }

  editarAcademica(id: number | undefined | null){
    this.id = id;

    const laboralToEdit = this.academicas.find(laboral => laboral.inf_acad_id === this.id);
    this.form.patchValue({
      inf_acad_est: laboralToEdit?.inf_acad_est,
      inf_acad_nom_esc: laboralToEdit?.inf_acad_nom_esc,
      titl: laboralToEdit?.titl,
      inf_acad_fec_ini: laboralToEdit?.inf_acad_fec_ini,
      inf_acad_fec_fin: laboralToEdit?.inf_acad_fec_fin,
    });

    this.creationMode = !this.creationMode;
  }


  addExperienceRow(){
    this.id = null;
    this.form.reset();
    this.creationMode = !this.creationMode;
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
}
