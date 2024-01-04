import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatObservacionDTO} from 'src/app/interface/observacionreclutador.interface';
import { UserSesionDTO } from 'src/app/interface/user.interface';
import { observationCategoryService } from 'src/app/service/observationcategory';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-perfil-usuario-e',
  templateUrl: './view-perfil-usuario-e.component.html',
  styleUrls: ['./view-perfil-usuario-e.component.css']
})
export class ViewPerfilUsuarioEComponent implements OnInit {
  categoriasFiltradas: any[] = [];
  mostrarStepper: boolean = false;
  selectedObservacionId: number | null = null;
  usuarioData: any;
  panelOpenState = false;
  observadoresData: CatObservacionDTO[];
  nuevaObservacion: string = '';
  observaciones: CatObservacionDTO[] = [];
  observacionesSubscription!: Subscription;
  enEdicion: any;
  isEditing: boolean = false;
  nombresUsuarios: Object[] = []; // Inicializado con un arreglo vacío
  usuarioGuardado: UserSesionDTO = {
    id:0,
    rut: '',
    name: '',
    firstLastname: '',
    secondLastname: '',
    email: '',
    phone: '',
  };

  observadoresCat: CatObservacionDTO = {
    usr2_email: '',
    usr2_ap_pat: '',
    usr2_nom: '',
    usr2_id: 0,

    id:0,
    cat_description:'',
    obs_id:0,

   apr_ger:'',
   operationalApproval: '',
   technicalApproval:'',
   description:'',
   creationDate: new Date (),
   modificationDate: new Date (),
   usr1_id: 0,
   usr_id_obs:0,   // ID del User que hizo la observación
   usr_id_obs_mod: 0,   // ID del User que modificó la observación

   // Campos de la entidad User
   name:'',
   firstLastname:'',
   email:'',

   
  }
  selectedCategory: number | null = null; // Inicializado como null
  
  categorias: CatObservacionDTO[] = [this.observadoresCat];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(
    private observationCategory: observationCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private form :  ReactiveFormsModule,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewPerfilUsuarioEComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar,
  ){
    this.usuarioData = data.usuario;
    this.observadoresData = data.observadores;
    // Inicializa los FormGroup con sus controles
    this.firstFormGroup = this._formBuilder.group({
      selectedCategory: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      nuevaObservacion: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    this.ObtenerUsuarioGuardado();
    this.cargarObservaciones();
    this.obtenerCategorias();

  }


  agregarNuevaObservacion() {
    this.mostrarStepper = true;
  this.selectedObservacionId = null ;
    // Espera a que la vista se actualice
    setTimeout(() => {
      // Busca el elemento del stepper en el DOM
      const stepperElement = document.getElementById('miStepper');
      // Si el elemento existe, desplázate hacia él
      if (stepperElement) {
        stepperElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }
  


  // Método para manejar el cambio en la selección de categoría
onCategorySelectionChange() {
  if (this.selectedCategory !== null) {
    // Aquí puedes realizar acciones basadas en la categoría seleccionada
    console.log('Categoría seleccionada:', this.selectedCategory);
    
    // Por ejemplo, buscar información relacionada con la categoría seleccionada
    const categoriaSeleccionada = this.categorias.find(categoria => categoria.id === this.selectedCategory);
    
    if (categoriaSeleccionada) {
      console.log('Información de la categoría seleccionada:', categoriaSeleccionada);
      // Puedes realizar más acciones aquí con la información de la categoría seleccionada
    }
  }
}

  obtenerCategorias() {
    this.observationCategory.getCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data; // Asigna los datos obtenidos a la propiedad 'categorias'
        console.log('Categorías obtenidas:', this.categorias); // Agrega este console.log para mostrar los datos en la consola
      },
      error => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }
  
  

// Función para cargar observaciones desde el backend
cargarObservaciones() {
  this.observacionService.obtenerCatObservacionesPorUsuarioId(this.usuarioData.id).subscribe(
    (observadoresCat) => {
      this.observaciones = observadoresCat;
      console.log('Observaciones cargadas:', observadoresCat);
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
    }
  );
}




editarObservacion(obs_id: number) {
  this.selectedObservacionId = obs_id;
  console.log('Iniciando la edición de la observación', obs_id);

  // Obtener la observación correspondiente a obs_id (suponiendo que tienes un arreglo de observaciones llamado 'observaciones')
  const observacionEditada = this.observaciones.find(observacion => observacion.obs_id === obs_id);

  if (observacionEditada) {
    // Si se encuentra la observación, establecer selectedCategory en el id de esa observación
    this.selectedCategory = observacionEditada.id;
    // Establecer los valores preexistentes en los otros campos
    this.observadoresCat.apr_ger = observacionEditada.apr_ger;
    this.observadoresCat.operationalApproval = observacionEditada.operationalApproval;
    this.observadoresCat.technicalApproval = observacionEditada.technicalApproval;
  } else {
    // Si no se encuentra la observación, puedes manejar el caso según tu lógica (por ejemplo, mostrar un mensaje de error).
    console.error('No se encontró la observación correspondiente a obs_id', obs_id);
  }

  // Cambiar el estado de edición a verdadero
  this.enEdicion = obs_id;
  this.isEditing = true;
  this.mostrarStepper = true;
  // Imprimir el nuevo estado para confirmar el cambio
  console.log('Estado actualizado de enEdicion después de la edición:', this.enEdicion);
}




    salir() {
    this.dialogRef.close();
    console.log('Se ha cerrado la ventana')
  }



  ObtenerUsuarioGuardado() {
    this.userService.obtenerUsuarioGuardado().subscribe({
      next: (data) => {
        this.usuarioGuardado = data;
        console.log(this.usuarioGuardado);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  guardarObservacionCat(usuarioId: number) {
    console.log('User ID recibido:', usuarioId); // Agrega este console.log para ver el valor de usuarioId
    // Verificar si la observación o las categorías no están vacías
    if (!this.nuevaObservacion.trim() || !this.selectedCategory) {
      console.error('La observación o la categoría no pueden estar vacías.');
      this.openSnackBar('La observación o la categoría no pueden estar vacías', 'Cerrar');
      return;
    }
  
    // Asignar la observación y la categoría seleccionada a observadoresCat
    this.observadoresCat.description = this.nuevaObservacion;
    this.observadoresCat.id = this.selectedCategory;
  
    // Usar los valores de usr_id_obs y usr_id_obs_mod del usuarioGuardado
    this.observadoresCat.usr_id_obs = this.usuarioGuardado.id ?? 0;
    this.observadoresCat.usr_id_obs_mod = this.usuarioGuardado.id ?? 0;
    if(
      !this.selectedObservacionId

    ){
    // Llama al servicio para guardar la nueva observación en el backend
    this.observacionService.guardarObservacionCat(
      this.observadoresCat,
      usuarioId, // Usar el valor de usuarioId pasado como parámetro
      this.observadoresCat.id,
      this.observadoresCat.usr_id_obs,
      this.observadoresCat.usr_id_obs_mod
    ).subscribe(
      (resultado) => {
        console.log('Observación guardada con éxito', resultado);
        this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
        this.openSnackBar('Observación guardada con éxito', 'Cerrar');
        this.mostrarStepper = false; // Ocultar el stepper
        this.resetearFormularioStepper(); //
      },
      (error) => {
        console.error('Error al guardar la observación:', error);
        this.openSnackBar('Error al guardar la observación', 'Cerrar');
      }
    );}

    else{ 
      this.observacionService.actualizarObservacionCat(this.selectedObservacionId, this.observadoresCat.id,this.observadoresCat.usr_id_obs_mod, this.observadoresCat).subscribe({
      next: (data) => {
        console.log('Observación actualizada con éxito', data);
        this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
        this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
        this.mostrarStepper = false; // Ocultar el stepper
      },
      error:(err)=>{
        console.log(err)
      }
     })
    }}
  
// Opcional: Método para resetear los valores del stepper
resetearFormularioStepper() {
  this.nuevaObservacion = '';
  this.selectedCategory = null;
  // Resetear cualquier otro estado o valor asociado al stepper
}


procesarId(id: number) {
  // Implementa aquí la lógica necesaria
  console.log('ID procesado:', id);
}


}
