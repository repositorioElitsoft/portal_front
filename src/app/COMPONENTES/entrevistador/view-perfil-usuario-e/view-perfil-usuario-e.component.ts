import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CatObservacionDTO } from 'src/app/interface/observacionreclutador.interface';
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
  selectedObservacionId: number | null = null;
  usuarioData: any;
  panelOpenState = false;
  observadoresData: CatObservacionDTO[];
  nuevaObservacion: string = '';
  observaciones: CatObservacionDTO[] = [];
  observacionesSubscription!: Subscription;
  enEdicion: any;
  isEditing: boolean = false;
  nombresUsuarios: Object[] = [];
  usuarioGuardado: UserSesionDTO = {
    usr_id: 0,
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

    cat_obs_id: 0,
    cat_obs_desc: '',
    obs_id: 0,

    apr_ger: '',
    apr_oper: '',
    apr_tec: '',
    obs_desc: '',
    obs_fec_cre: new Date(),
    obs_fec_mod: new Date(),
    usr1_id: 0,
    usr_id_obs: 0,   // ID del Usuario que hizo la observación
    usr_id_obs_mod: 0,   // ID del Usuario que modificó la observación

    // Campos de la entidad Usuario
    usr_id: 0,
    usr_nom: '',
    usr_ap_pat: '',
    usr_email: '',
  }

  selectedCategory: number | null = null; // Inicializado como null
  categorias: CatObservacionDTO[] = [this.observadoresCat];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private categoriaObservacion: CategoriaobservacionService,
    private usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewPerfilUsuarioEComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar,
  ) {
    this.usuarioData = data.usuario;
    this.observadoresData = data.observadores;
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
    this.selectedObservacionId = null;
    setTimeout(() => {
      const stepperElement = document.getElementById('miStepper');
      if (stepperElement) {
        stepperElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }


  onCategorySelectionChange() {
    if (this.selectedCategory !== null) {
      const categoriaSeleccionada = this.categorias.find(categoria => categoria.cat_obs_id === this.selectedCategory);
      if (categoriaSeleccionada) {
        console.log('Información de la categoría seleccionada:', categoriaSeleccionada);
      }
    }
  }

  obtenerCategorias() {
    this.categoriaObservacion.getCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      error => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

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


  editarObservacion(obs_id: number) {
    this.selectedObservacionId = obs_id;
    console.log('Iniciando la edición de la observación', obs_id);

    // Obtener la observación correspondiente a obs_id (suponiendo que tienes un arreglo de observaciones llamado 'observaciones')
    const observacionEditada = this.observaciones.find(observacion => observacion.obs_id === obs_id);

    if (observacionEditada) {
      // Si se encuentra la observación, establecer selectedCategory en el cat_obs_id de esa observación
      this.selectedCategory = observacionEditada.cat_obs_id;
      // Establecer los valores preexistentes en los otros campos
      this.observadoresCat.apr_ger = observacionEditada.apr_ger;
      this.observadoresCat.apr_oper = observacionEditada.apr_oper;
      this.observadoresCat.apr_tec = observacionEditada.apr_tec;
    } else {
      console.error('No se encontró la observación correspondiente a obs_id', obs_id);
    }

    this.enEdicion = obs_id;
    this.isEditing = true;
    this.mostrarStepper = true;
    console.log('Estado actualizado de enEdicion después de la edición:', this.enEdicion);
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
    if (
      !this.selectedObservacionId

    ) {
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

    else {
      this.observacionService.actualizarObservacionCat(this.selectedObservacionId, this.observadoresCat.cat_obs_id, this.observadoresCat.usr_id_obs_mod, this.observadoresCat).subscribe({
        next: (data) => {
          console.log('Observación actualizada con éxito', data);
          this.cargarObservaciones(); // Vuelve a cargar las observaciones actualizadas
          this.openSnackBar('Observación actualizada con éxito', 'Cerrar');
          this.mostrarStepper = false; // Ocultar el stepper
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  resetearFormularioStepper() {
    this.nuevaObservacion = '';
    this.selectedCategory = null;
  }

}
