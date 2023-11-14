import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Usuario } from '../../interface/user.interface'
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Laboral } from 'src/app/interface/laboral.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddLaboralComponent } from '../shared/add-laboral/add-laboral.component';
import { EditLaboralComponent } from '../shared/edit-laboral/edit-laboral.component';



@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {

  creationMode: boolean = false;

  laborales: Laboral[] = []
  id: number | null | undefined = null
  today;

  form!: FormGroup

  minFecha: string = '';

  checkboxFormCreated = false;

  herramientasDisponibles!: HerramientaData[];
  herrIdList: number[] = [];


  constructor(private usuarioService: UsuarioService, 
    private formBuilder: FormBuilder,
    public dialog : MatDialog,
    private herramientaService:HerramientasService, 
    private laboralService: LaboralService, 
    private route: ActivatedRoute, private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
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

    this.generateHerrForm()
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

  eliminarLaboral(id: number | undefined | null){
    this.laboralService.eliminarLaboral(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.obtenerLaboralesGuardados();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  goBack(){
    this.creationMode = false;
  }


  generateHerrForm(){

    
    this.herramientaService.getHerramientasByUserId().subscribe({
      next:(data)=>{
        
        console.log("recieved data herramientas: ",data)
        this.herramientasDisponibles = data;
   
        this.herramientasDisponibles.forEach((herramienta)=>{

          let wasCheckedAlready = false

      
          
          const newControl = new FormControl(wasCheckedAlready);
          this.form.addControl(herramienta.herr_usr_id.toString(), newControl);
  
          this.herrIdList.push(herramienta.herr_usr_id)
       

        })
     
        this.checkboxFormCreated = true;
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  openaddExperienciaLaboral() {
    const dialogRef = this.dialog.open(AddLaboralComponent, {
      width: '600px',
      height: '700px',
      data: {} // Puedes pasar datos al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
      // Aquí puedes realizar acciones después de cerrar el modal si es necesario
    });
  }
  
  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }

 addExperienciaLaboral(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddLaboralComponent, {
      width: '600px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
   
  }




  submitForm(event: Event) {

    event.preventDefault();
    console.log("Form guardado:",this.form.value)

    const laboralNueva: Laboral = this.form.value;

    let herramientasFinal: HerramientaData[] = [];
    this.herrIdList.forEach(id =>{
      

      let herra: HerramientaData = {
          herr_usr_id: id,
          herr_is_cert: false,
          herr_nvl: "",
          herr_usr_anos_exp: "",
          versionProducto: {
            vrs_id: 0,
            vrs_name: "",
            prd: {
              prd_id:0,
              prd_nom:"",
              cat_prod_id:{
                cat_prod_id: 0,
                cat_prod_nom: ""
              }
            }
          }
      }

      if (this.form.get(id.toString())?.value == true) {
        herramientasFinal.push(herra);
      }
      
    })

    laboralNueva.herramientas = herramientasFinal;

    console.log("Laboral final guardada", laboralNueva)
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


  editLaboral(event: any) {
    console.log('Evento recibido:', event); // Verificar el evento recibido
  
    // Intentando obtener el ID del elemento padre del elemento que desencadenó el evento
    const inf_lab_id = event.target.parentElement.id;
    console.log('inf_lab_id:', inf_lab_id); // Verificar el ID obtenido
  
    if (inf_lab_id) {
      console.log('ID definido, solicitando datos...'); // Confirmar que el ID está definido
  
      // Llamar al servicio para obtener los datos laborales utilizando inf_lab_id
      this.laboralService.obtenerLaboralPorId( inf_lab_id).subscribe({
        next: (data) => {
          console.log('Data llegada:', data); // Inspeccionar los datos recibidos del servicio
  
          // Aquí puedes continuar con el código para abrir el diálogo y pasar los datos
          const dialogRef = this.dialog.open(EditLaboralComponent, {
            width: '800px',
            height: '700px',
            data: { inf_lab_id: inf_lab_id } // Pasar inf_lab_id como parte de los datos
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
      console.error('inf_lab_id es undefined o null'); // Manejar el caso de que inf_lab_id no esté definido
    }
  }
  






}
