import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Usuario } from '../../interface/user.interface'
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Laboral } from 'src/app/interface/laboral.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {

  creationMode: boolean = false;

  laborales: Laboral[] = []
  id: number | null | undefined = null

  form!: FormGroup

  minFecha: string = '';



  constructor(private usuarioService: UsuarioService, 
    private formBuilder: FormBuilder,
    private herramientaService:HerramientasService, 
    private laboralService: LaboralService, private route: ActivatedRoute, private router: Router) {
      this.buildForm();
     }

  ngOnInit(): void {
    this.obtenerLaboralesGuardados();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      inf_lab_crg_emp: ["",[Validators.required]],
      inf_lab_emp: ["",[Validators.required]],
      inf_lab_act: ["",[Validators.required]],
      inf_lab_fec_ini: ["",[Validators.required]],
      inf_lab_fec_fin: ["",[Validators.required]],
    });
  }


  obtenerLaboralesGuardados(){
    this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
      next: (data) =>{
        this.laborales = data;
        console.log(this.laborales)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  goBack(){
    this.creationMode = false;
  }

  editarLaboral(id: number | undefined | null){
    this.id = id;

    const laboralToEdit = this.laborales.find(laboral => laboral.inf_lab_id === this.id);
    this.form.patchValue({
      inf_lab_crg_emp: laboralToEdit?.inf_lab_crg_emp,
      inf_lab_emp: laboralToEdit?.inf_lab_emp,
      inf_lab_act: laboralToEdit?.inf_lab_act,
      inf_lab_fec_ini: laboralToEdit?.inf_lab_fec_ini,
      inf_lab_fec_fin: laboralToEdit?.inf_lab_fec_fin,
    });

    this.creationMode = !this.creationMode;
  }


  addExperienceRow(){
    this.id = null;
    this.form.patchValue({
      inf_lab_crg_emp: "",
      inf_lab_emp: "",
      inf_lab_act: "",
      inf_lab_fec_ini:"",
      inf_lab_fec_fin: "",
    });
    this.creationMode = !this.creationMode;
  }


  submitForm(event: Event) {

    event.preventDefault();

    const laboralNueva: Laboral = this.form.value;
    this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
      (laboralGuardada: Laboral) => {
        console.log('Información laboral guardada:', laboralGuardada);
        this.creationMode = false;
        this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
          next:(data)=>{
            this.laborales = data;
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
