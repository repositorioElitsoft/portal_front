import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatObservacionDTO} from 'src/app/interface/observacionreclutador.interface';
import { UserSesionDTO } from 'src/app/interface/user.interface';
import { CategoriaobservacionService } from 'src/app/service/categoriaobservacion.service';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-view-perfil-usuario-e',
  templateUrl: './view-perfil-usuario-e.component.html',
  styleUrls: ['./view-perfil-usuario-e.component.css']
})
export class ViewPerfilUsuarioEComponent implements OnInit {
  categoriasFiltradas: any[] = [];
  mostrarStepper: boolean = false;
  usuarioData: any;
  panelOpenState = false;
  observadoresData: CatObservacionDTO[];
  nuevaObservacion: string = '';
  observaciones: CatObservacionDTO[] = [];
  observacionesSubscription!: Subscription;
  enEdicion: any;
  nombresUsuarios: Object[] = []; // Inicializado con un arreglo vacío
  usuarioGuardado: UserSesionDTO = {
    usr_id:0,
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_tel: '',
  };

  observadoresCat: CatObservacionDTO = {
    usr2_email: '',
    usr2_ap_pat: '',
    usr2_nom: '',
    usr2_id: 0,

    cat_obs_id:0,
    cat_obs_desc:'',
    obs_id:0,

   apr_ger:'',
   apr_oper: '',
   apr_tec:'',
   obs_desc:'',
   obs_fec_cre: new Date (),
   obs_fec_mod: new Date (),
   usr1_id: 0,
   usr_id_obs:0,   // ID del Usuario que hizo la observación
   usr_id_obs_mod: 0,   // ID del Usuario que modificó la observación

   // Campos de la entidad Usuario
   usr_id: 0,
   usr_nom:'',
   usr_ap_pat:'',
   usr_email:'',

   
  }
  selectedCategory: number | null = null; // Inicializado como null
  
  categorias: CatObservacionDTO[] = [this.observadoresCat];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(
    private categoriaObservacion: CategoriaobservacionService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
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
    const categoriaSeleccionada = this.categorias.find(categoria => categoria.cat_obs_id === this.selectedCategory);
    
    if (categoriaSeleccionada) {
      console.log('Información de la categoría seleccionada:', categoriaSeleccionada);
      // Puedes realizar más acciones aquí con la información de la categoría seleccionada
    }
  }
}

  obtenerCategorias() {
    this.categoriaObservacion.getCategorias().subscribe(
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
  this.observacionService.obtenerCatObservacionesPorUsuarioId(this.usuarioData.usr_id).subscribe(
    (observadoresCat) => {
      this.observaciones = observadoresCat;
      console.log('Observaciones cargadas:', observadoresCat);
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
    }
  );
}

// Función para guardar una nueva observación
guardarObservacion() {
  if (!this.nuevaObservacion.trim()) {
    console.error('La observación no puede estar vacía.');
    this.openSnackBar('La observación no puede estar vacía', 'Cerrar');
    return;
  }

  // Obtener observaciones actuales del servidor
  this.observacionService.obtenerObservacionesPorUsuarioId(this.usuarioData.usr_id).subscribe(
    (observaciones) => {
      if (observaciones.length >= 10) {
        console.error('Se ha alcanzado el límite máximo de observaciones.');
        this.openSnackBar('Se ha alcanzado el límite máximo de observaciones', 'Cerrar');
        return;
      }

      // Proceder con la creación de la nueva observación si el límite no se ha alcanzado
      const nuevaObservacion: CatObservacionDTO = {
        cat_obs_id:0,
        cat_obs_desc: '',
        obs_id: 0,
        usr_id: 0,
        usr_nom: '',
        usr_email: '',
        usr_ap_pat: '',
        obs_desc: this.nuevaObservacion,
        obs_fec_cre: new Date(),
        obs_fec_mod: new Date(),
        apr_tec: '',
        apr_oper: '',
        apr_ger: '',
        usr_id_obs: this.usuarioGuardado.usr_id ?? 0,
        usr_id_obs_mod: this.usuarioGuardado.usr_id ?? 0,
        usr1_id: 0,
        usr2_email: '',
        usr2_ap_pat: '',
        usr2_nom: '',
        usr2_id: 0,
      };

      // Llama al servicio para guardar la nueva observación en el backend
      this.observacionService.guardarObservacionCat(nuevaObservacion, this.usuarioData.usr_id, nuevaObservacion.usr_id_obs,nuevaObservacion.cat_obs_id,
          nuevaObservacion.usr_id_obs_mod).subscribe(
        (resultado) => {
          console.log('Observación guardada con éxito', resultado);
          this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
          this.nuevaObservacion = ''; // Limpia el área de texto
          this.openSnackBar('Observación guardada con éxito', 'Cerrar');
        },
        (error) => {
          console.error('Error al guardar la observación:', error);
          this.openSnackBar('Error al guardar la observación', 'Cerrar');
        }
      );
    },
    (error) => {
      console.error('Error al cargar las observaciones:', error);
      this.openSnackBar('Error al cargar las observaciones', 'Cerrar');
    }
  );
}


  editarObservacion(obs_id: number) {
    console.log('Iniciando la edición de la observación', obs_id);

    // Antes de cambiar el estado, puedes imprimir el estado actual para comparar
    console.log('Estado actual de enEdicion antes de la edición:', this.enEdicion);

    this.enEdicion = obs_id;

    // Después de cambiar el estado, imprime el nuevo estado para confirmar el cambio
    console.log('Estado actualizado de enEdicion después de la edición:', this.enEdicion);
}





actualizarObservacionCat(catObservacion: CatObservacionDTO) {
  // Verificar si la descripción de la observación está vacía
  if (!catObservacion.obs_desc.trim()) {
      console.error('La descripción de la observación no puede estar vacía.');
      this.openSnackBar('La descripción de la observación no puede estar vacía', 'Cerrar');
      return;
  }

  // Establece el usr_id_obs_mod al ID del usuario actual
  catObservacion.usr_id_obs_mod = this.usuarioGuardado?.usr_id ?? 0;

  this.observacionService.actualizarObservacionCat( catObservacion.obs_id ,catObservacion.cat_obs_id,catObservacion.usr_id_obs_mod,catObservacion).subscribe(
      (resultado) => {
          console.log('Observación actualizada con éxito', resultado);
          this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
          this.enEdicion = null; // Salir del modo de edición
          this.cargarObservaciones(); // Opcional, para recargar las observaciones
      },
      (error) => {
          console.error('Error al actualizar la observación:', error);
          this.openSnackBar('Error al actualizar la observación', 'Cerrar');
      }
  );
}



    salir() {
    this.dialogRef.close();
    console.log('Se ha cerrado la ventana')
  }



  ObtenerUsuarioGuardado() {
    this.usuarioService.obtenerUsuarioGuardado().subscribe({
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
    console.log('Usuario ID recibido:', usuarioId); // Agrega este console.log para ver el valor de usuarioId
    // Verificar si la observación o las categorías no están vacías
    if (!this.nuevaObservacion.trim() || !this.selectedCategory) {
      console.error('La observación o la categoría no pueden estar vacías.');
      this.openSnackBar('La observación o la categoría no pueden estar vacías', 'Cerrar');
      return;
    }
  
    // Asignar la observación y la categoría seleccionada a observadoresCat
    this.observadoresCat.obs_desc = this.nuevaObservacion;
    this.observadoresCat.cat_obs_id = this.selectedCategory;
  
    // Usar los valores de usr_id_obs y usr_id_obs_mod del usuarioGuardado
    this.observadoresCat.usr_id_obs = this.usuarioGuardado.usr_id ?? 0;
    this.observadoresCat.usr_id_obs_mod = this.usuarioGuardado.usr_id ?? 0;
  
    // Llama al servicio para guardar la nueva observación en el backend
    this.observacionService.guardarObservacionCat(
      this.observadoresCat,
      usuarioId, // Usar el valor de usuarioId pasado como parámetro
      this.observadoresCat.cat_obs_id,
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
    );
  }
  
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
