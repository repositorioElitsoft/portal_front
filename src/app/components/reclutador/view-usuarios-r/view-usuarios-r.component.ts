import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort} from '@angular/material/sort';
import { Usuario} from 'src/app/interface/user.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { EditPerfilUsuarioRComponent } from '../edit-perfil-usuario-r/edit-perfil-usuario-r.component'; // Ajusta la ruta según tu estructura de carpetas
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewPerfilUsuarioRComponent } from '../view-perfil-usuario-r/view-perfil-usuario-r.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { viewCrudArchivoComponent } from '../view-crudarchivo/view-crudarchivo.component';
import * as Papa from 'papaparse';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { forkJoin } from 'rxjs';
import { LaboralService } from 'src/app/service/laboral.service';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SendMailToUsersDialogueComponent } from '../send-mail-to-users-dialogue/send-mail-to-users-dialogue.component';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { HttpClient } from '@angular/common/http';
import { NivelService } from 'src/app/service/nivel.service';
import { Niveles } from 'src/app/interface/niveles.interface';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
const ELEMENT_DATA: Usuario[] = [];
@Component({
  selector: 'app-view-usuarios-r',
  templateUrl: './view-usuarios-r.component.html',
  styleUrls: ['./view-usuarios-r.component.css'],
})
export class ViewUsuariosRComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['usr_nom', 'usr_tel', 'usr_email', 'acciones', 'seleccionar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  filtroPuntaje: string = '';
  filtroCargo: string = '';
  originalDataCopy: Usuario[] = [];
  usuarios: any[] = [];
  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  niveles : Niveles []=[];
  versiones: VersionProducto[] = [];
  selectedfechaPostulacion: Date | null = null;
  selectedAniosExpRange: number[] = [1, 10];
  isIrrelevant: boolean = true;
  selectedCheckbox: FormGroup;
  selectedSueldoRange: number[] = [1, 5000000];
  selectedCargo: number = 0;
  selectedCategoria: number = 0;
  selectedProducto: number = 0;
  selectedVersion: number = 0;
  selectedAniosExp: number = 0;
  selectedProductoNombre: string | undefined = "";
  selectedEstado: string = '';
  inputContent: boolean = false;
  lastYears: number = 0;
  resultadosExam: any[]=[];
  cargos: JobPosition[] = [];
  idUser:number = 0;
  filterCargo: string = '';
  resultados: any[] = [];
  porcentajeAprobacion:number = 0;
  filteredUsuarios:any=[]=[];
  selectedOption:String = '';
  selectedNivel : number = 0;
  isSueldoSliderEnabled = true;
  porcentajesAprobacion = [
    { value: 100, label: '100%' },
    { value: [70, 99], label: '70% - 99%' },
    { value: [40, 69], label: '40% - 69%' }
  ];
  selectedPorcentajeAprobacion: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private observacionReclutadorService: ObservacionService,
    private preguntaService:PreguntaService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private nivelService: NivelService,
    private JobPositionService: JobPositionService,
    private cargoService: CargosUsuarioService
  ) {
    this.selectedCheckbox = this.fb.group({
    });
  }
  ngOnInit(): void {
    this.obtenerResultados();
    this.obtenerUsuarios();
    this.getCategories();
    this.obtenerResultadosByUser();
    this.cargoService.listarCargos()
    this.getJobPosition();
  }
  getJobPosition() {
    this.JobPositionService.obtenerListaJobPosition().subscribe(
      (data: JobPosition[]) => {
        this.cargos = data;
      }
    )
  }
  toggleSueldoSlider() {
    this.isSueldoSliderEnabled = !this.isSueldoSliderEnabled;
  }
  obtenerResultados() {
    this.usuarioService.obtenerResultados().subscribe(
      (data) => {
        this.resultados = data;
        this.filterData();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterData() {
    let filteredArray = this.originalDataCopy;
    const [minSueldo, maxSueldo] = this.selectedSueldoRange;
    filteredArray = filteredArray.filter(usuario => {
      return usuario.cargoUsuario && usuario.cargoUsuario.some(cargo => {
        const sueldo = cargo.crg_usr_pret; 
        return Number(sueldo) >= minSueldo && Number(sueldo) <= maxSueldo;
      });
    });
    if (this.selectedCargo > 0) {
      filteredArray = filteredArray.filter(usuario => {
        return usuario.cargoUsuario && usuario.cargoUsuario.some(cargo => cargo.jobPosition && cargo.jobPosition.id === this.selectedCargo);
      });
    }
if (this.selectedfechaPostulacion) {
  console.log("seleccioné fecha");
  // Obtener la fecha seleccionada en formato ISO y cortar para quedarse solo con la parte de la fecha
  const formattedSelectedFechaPostulacion = this.selectedfechaPostulacion.toISOString().split('T')[0];

   // Filtrar los cargos por fecha de postulación
   filteredArray = filteredArray.filter(usuario => {
    const cargos = usuario.cargoUsuario
    console.log("cargos", cargos);
        // Check if cargos is defined and has at least one element
        if (cargos && cargos.length > 0) {
          console.log("cargos es mayor que 1");
          // Assuming fechaPostulacion is a property of CargoUsuario
          const primerCargo = cargos[0];
          const fechaPostulacion = primerCargo.fechaPostulacion;

           // Verificar si la propiedad fechaPostulacion existe y no es undefined
      if(!fechaPostulacion)return false;
      console.log("tipo de la fecha:",typeof fechaPostulacion );
      console.log("fecha obtenida:", fechaPostulacion );
      // Comparar solo la parte de la fecha
       console.log("fecha obtenida2:", String(fechaPostulacion).split('T')[0] );
       console.log("fecha seleccionada:", this.selectedfechaPostulacion!.toISOString().split('T')[0] );
       return  String(fechaPostulacion).split('T')[0] === formattedSelectedFechaPostulacion;
      }
      return false;
  });

  // Imprimir el array de cargos filtrados
  console.log("Cargos filtrados por fecha de postulación:", this.cargos);
}


    // Filtro por estado
    if (this.selectedEstado && this.selectedEstado !== '') {
      filteredArray = filteredArray.filter((usuario) => {
        return usuario.cargoUsuario && usuario.cargoUsuario.some((estado) => estado.disponibilidad === this.selectedEstado);
      });
    }

    // Filtro por producto
    if (this.selectedProducto > 0) {
      const selectedProduct = this.productos.find(producto => producto.prd_id === this.selectedProducto);
      if (selectedProduct) {
        filteredArray = filteredArray.filter(element => element.usr_herr.includes(selectedProduct.prd_nom));
      }
    }

    // Filtro por versión
    if (this.selectedVersion > 0) {
      const selectedVersion = this.versiones.find(version => version.vrs_id === this.selectedVersion);
      if (selectedVersion) {
        filteredArray = filteredArray.filter(element => element.herr_ver.includes(selectedVersion.vrs_name));
      }
    }



// Filtro por resultado del usuario
  if (this.resultados !== undefined) {
  this.preguntaService.obtenerResultadosByUser(this.idUser).subscribe(
    (resultadoUsuario) => {
      console.log('Resultado obtenido del servicio:', resultadoUsuario);
      console.log('Resultados actuales en el componente:', this.resultados);

      filteredArray = filteredArray.filter(usuario => {
        // Usar una función de flecha para preservar el contexto
        return resultadoUsuario === this.resultados;
      });

      console.log('Array filtrado:', filteredArray);
    },
    (error) => {
      console.error('Error al obtener resultados del usuario: ', error);
    }
  );
}
    // Filtro por nivel de examen
    if (this.selectedNivel > 0) {
      filteredArray = filteredArray.filter(resultados => {
        return this.resultados.find(resultado => {
          const nivelDificultad = resultado.examen.nivelDificultad;
          const productos = resultado.examen.productos;

          console.log('nivel examen:', nivelDificultad);
          console.log('nivel seleccionado:', this.selectedNivel);
          console.log('Productos:', productos);
          console.log('Producto seleccionado:', this.selectedProducto);
          return productos.length > 0 && productos[0].prd_id === this.selectedProducto && nivelDificultad === this.selectedNivel;
        });
      });
    }
    // Filtro por porcentaje de aprobación
    if (this.selectedPorcentajeAprobacion) {
      filteredArray = filteredArray.filter(usuario => {
        const resultadosDeUsuario= this.resultados.filter(resultado => {
          return resultado.usuarioId === usuario.usr_id;

        });
        const resultadoFinal = resultadosDeUsuario.find(resultado =>{
          const resultadoExamen = resultado.resultadosExamen;
          const puntosMaximos = resultado.examen.puntosMaximos;
          const nivelDificultad = resultado.examen.nivelDificultad;
          const productos = resultado.examen.productos;
          const porcentajeAprobacion = (resultadoExamen / puntosMaximos) * 100;
          // Verifica si el usuario cumple con los filtros anteriores
          const cumpleFiltrosAnteriores = productos.length > 0 && productos[0].prd_id === this.selectedProducto && nivelDificultad === this.selectedNivel;
          // Verifica si el porcentaje de aprobación cumple con el rango seleccionado
          if (cumpleFiltrosAnteriores) {
            if (Array.isArray(this.selectedPorcentajeAprobacion.value)) {
              return porcentajeAprobacion >= this.selectedPorcentajeAprobacion.value[0] &&
                    porcentajeAprobacion <= this.selectedPorcentajeAprobacion.value[1];
            } else {
              console.log("usuario", resultado.usuarioId);
              console.log("% aprobacion", porcentajeAprobacion);
              console.log("% aprobacion seleccionado", this.selectedPorcentajeAprobacion.value);
              console.log("comparacion", porcentajeAprobacion === this.selectedPorcentajeAprobacion.value);
              return porcentajeAprobacion === this.selectedPorcentajeAprobacion.value;
            }
          }
          return false;
        });
        console.log("resultado final",resultadoFinal);
        if (resultadoFinal){
          return true;
        }
        return false;
        })
    }
    //Filtro
    if (this.lastYears) {
      filteredArray = filteredArray.filter((usuario) => {
        return usuario.laborales?.some((experiencia) => {
          return experiencia.herramientas?.some((herramienta: any) => {
            const herramientaExperiencia = herramienta.versionProducto?.prd?.prd_id;
            if (herramientaExperiencia && herramientaExperiencia === this.selectedProducto) {
              const fechaFin = new Date(experiencia.inf_lab_fec_fin);
              const currentYear = new Date().getFullYear();
              return fechaFin.getFullYear() >= currentYear - this.lastYears;
            }

            return false;
          });
        });
      });
    }
    if (this.selectedVersion > 0) {
      const [min, max] = this.selectedAniosExpRange;
      filteredArray = filteredArray.filter(element => {
        const anosExp = element.herr_exp.split(', ').map(Number);
        return anosExp.some(anos => anos >= min && anos <= max);
      });
    }
    console.log('Filtro de años de experiencia:', this.selectedAniosExpRange);
    console.log('Usuarios filtrados:', filteredArray);

    this.dataSource.data = filteredArray;
  }
  filterByCargo() {
    let filteredArray = this.originalDataCopy;

    if (this.filterCargo) {
      const filtroCargoLowerCase = this.filterCargo.toLowerCase();
      filteredArray = filteredArray.filter(usuario =>
        usuario.cargoUsuario?.some(cargo =>
          cargo.crg_prf && cargo.crg_prf.toLowerCase().includes(filtroCargoLowerCase)
        )
      );
    }
    this.dataSource.data = filteredArray;
    console.log('Usuarios filtrados', filteredArray);
  }
  onIrrelevanceChange() {
    if (this.isIrrelevant) {
      this.lastYears = 0;
    }
    this.filterData();
  }
  onLast5YearsChange() {
    this.filterData();
  }

  filterInput() {
    let filteredArray = this.originalDataCopy;

    if (this.filtro) {
      const filtroLowerCase = this.filtro.toLowerCase();
      filteredArray = filteredArray.filter(element => {
        if (element.usr_nom) {
          return element.usr_nom.toLowerCase().includes(filtroLowerCase);
        }
        return false;
      });
    }

    this.dataSource.data = filteredArray;
  }

  filterInputCargoOcupado() {
    let filteredArray = this.originalDataCopy;

    if (this.filtroCargo) {
      const filtroLowerCase = this.filtroCargo.toLowerCase();
      filteredArray = filteredArray.filter(usuario => {
        const cargo=usuario.laborales;
        if(cargo && cargo.length >0){
          const primerCargo = cargo[0];
          const cargoOcupado= primerCargo.inf_lab_crg_emp;
          if (cargoOcupado) {
            return cargoOcupado.toLowerCase().includes(filtroLowerCase);
          }
          return false;

        }
        return false;
      });
    }
    this.dataSource.data = filteredArray;
  }



  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

        return `${value}`;
    }

  filterProducto() {
    this.filterData();
  }
  filterNivel() {
    this.filterData();
  }
  filterPorcentaje() {
    this.filterData();
  }


  filterPuntaje() {
    this.filtroPuntaje = `Filtrado por puntaje: ${this.filtroPuntaje}`;
    this.filterData();
  }


  filterVersion() {
    if (this.selectedVersion === 0) {
      this.selectedAniosExpRange = [1, 10];
    }

    this.filterData();
  }

  filterAniosExp() {
    this.filterData();
  }

obtenerUsuarios(): void {
  this.usuarioService.obtenerUsuarios().subscribe(
    (data: any[]) => {
      console.log('data:', data);

      // Filtrar usuarios por usr_rol igual a "GUEST"
      const usuarios = data
        .filter((usuario) => usuario.usr_rol === 'GUEST')
        .map((usuario) => ({
          usr_nom: usuario.usr_nom + " " + usuario.usr_ap_pat + " " + usuario.usr_ap_mat || '',
          usr_tel: usuario.usr_tel || '',
          usr_email: usuario.usr_email || '',
          usr_rol: usuario.usr_rol || '',
          usr_direcc: usuario.usr_direcc || '',
          usr_herr: usuario.herramientas
            .filter((herramienta: HerramientaData) => herramienta.versionProducto && herramienta.versionProducto.prd)
            .map((herramienta: HerramientaData) => herramienta.versionProducto.prd.prd_nom)
            .join(', '),
          herr_ver: usuario.herramientas
            .filter((herramienta: HerramientaData) => herramienta.versionProducto && herramienta.versionProducto.vrs_name)
            .map((herramienta: HerramientaData) => herramienta.versionProducto.vrs_name)
            .join(', '),
          herr_exp: usuario.herramientas
            .filter((herramienta: HerramientaData) => herramienta.versionProducto && herramienta.versionProducto.prd)
            .map((herramienta: HerramientaData) => herramienta.herr_usr_anos_exp)
            .join(', '),
          laborales: usuario.laborales,
          usr_id: usuario.usr_id,
          cvPath: usuario.cvPath,
          cargoUsuario: usuario.cargoUsuario,

        }));

        const controlNames = Object.keys(this.selectedCheckbox.controls);
        controlNames.forEach(controlName => {
          this.selectedCheckbox.removeControl(controlName);
        });


        usuarios.forEach(usuario =>{
          this.selectedCheckbox.addControl(String(usuario.usr_email), this.fb.control(false))
        });


      this.originalDataCopy = usuarios;
      this.dataSource.data = usuarios;
    },
    (error) => {
      console.log(error);
    }
  );
}


  onSendMailPressed(){
    const values = this.selectedCheckbox.value

    const emails: any = []

    for (const key in values) {
      if (!values.hasOwnProperty(key)){continue}
      const value = values[key];
      if (!value){continue}
      emails.push(key)
    }

    const dialogRef = this.dialog.open(SendMailToUsersDialogueComponent, {
      data: {emails},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }



  clearDate() {
    this.selectedfechaPostulacion = null;
    this.filterData();
  }

  exportToCSV() {
    const dataToExport = this.dataSource.data;
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }



  getCategories() {
    this.categoriaProductoService.getCategoriasDisponibles().subscribe(
      (data: CategoriaProducto[]) => {
        this.categorias = data;
      },
      () => {
        console.log('Error al obtener categorías:');
      }
    );
  }


  obtenerYFiltrarResultados() {
    console.log('Llamando a obtenerResultadosByUser para el usuario con ID:', this.idUser);

    this.preguntaService.obtenerResultadosByUser(this.idUser).subscribe(
      (resultadoUsuario) => {
        console.log('Resultado obtenido del servicio para el usuario:', resultadoUsuario);

        // Aquí puedes verificar si los datos recibidos son lo que esperas
        this.dataSource.data = this.originalDataCopy.filter(usuario => {
          // Añadir un console.log dentro del filtro para ver qué está pasando
          const esIgual = this.resultados === resultadoUsuario;
          console.log('Comparando resultados - Usuario:', usuario, '¿Es igual?:', esIgual);

          return esIgual;
        });

        // Mostrar los datos filtrados
        console.log('Datos después de aplicar el filtro:', this.dataSource.data);
      },
      (error) => {
        console.error('Error al obtener resultados del usuario: ', error);
      }
    );

  }





  obtenerResultadosByUser() {
    this.preguntaService.obtenerResultadosByUser(this.idUser).subscribe(
      (data: any) => {
        this.resultados = data;
        console.log('Resultados obtenidos:', this.resultados);
      },
      (error) => {
        console.error('Error al obtener resultados:', error);
      }
    );
  }



  getProductos(categoriaId: number){
    console.log('categoria id:', categoriaId)

    this.selectedProducto = 0;
    this.selectedVersion = 0;
    this.selectedProductoNombre = '';
    this.filterInput();
    if (categoriaId) {
      this.productoService.obtenerProductosPorCategoria(categoriaId).subscribe(
        (productos: Producto[]) => {
          this.productos = productos;
          this.selectedProducto = 0;
          this.versiones = [];
          this.originalDataCopy = this.dataSource.data;
          this.filterProducto();
          this.selectedProductoNombre = this.productos.find((producto) => producto.prd_id === this.selectedProducto)?.prd_nom;
          this.getVersion(this.selectedProducto);
        },
        (error) => {
          console.log('Error al cargar productos ', error);
        }
      );
    } else {
      this.selectedProducto = 0;
      this.versiones = [];
      this.productos = [];
      this.selectedProductoNombre = '';
      this.originalDataCopy = this.dataSource.data;
      this.filterProducto();
    }
  }


    getVersion(productoId: number) {
      if (productoId) {
        this.productoService.getVersionByProduct(productoId).subscribe(
          (data: VersionProducto[]) => {
            this.versiones = data;
            // this.filter(new Event('input'));
          },
          (error) => {
            console.log('Error al cargar version ', error);
          }
        );
      }
    }

      getNiveles() {

        this.nivelService.listarNiveles().subscribe(
          (data: Niveles[]) => {
            this.niveles = data;

          },
          (error) => {
            console.log('Error al obtener niveles ', error);
          }
        );

    }




  announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    botonEstadistica(event: any){
      event.preventDefault()
      const elementId = event.target.parentElement.id
      console.log('Element ID:', elementId);

    this.router.navigate([
      "reclutador/estadisticas"

    ])

    }


    openUserProfile(event: any) {
      const userId = event.currentTarget.id; // Obtén el ID del usuario desde el evento
      console.log('User ID:', userId); // Imprime el ID del usuario en la consola

      // Llamadas simultáneas a los servicios
      forkJoin({
        observadores: this.observacionReclutadorService.obtenerObservacionesPorUsuarioId(userId),
        usuario: this.usuarioService.getUsuarioId(userId)
      }).subscribe({
        next: (resultados) => {
          // Extraemos los resultados
          const { observadores, usuario } = resultados;

          // Lógica con los datos obtenidos
          console.log('Observaciones del usuario:', observadores);
          console.log('Perfil del usuario:', usuario);

          // Configura el tamaño del diálogo
          const dialogRef = this.dialog.open(ViewPerfilUsuarioRComponent, {
            data: { userId, observadores, usuario }, // Pasa los datos combinados al componente hijo
            height: '60vh', // Establece la altura del diálogo
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
             this.obtenerUsuarios();
          });
        },
        error: (error) => {
          console.error('Error al obtener datos del usuario:', error);
          // Manejo de errores aquí
        }
      });
    }



openBottomSheet(event: any) {
  const userId = event.currentTarget.id;
  console.log('User ID:', userId);
  // Abre el componente hijo y pasa userId como un parámetro de datos
  this._bottomSheet.open(viewCrudArchivoComponent, {
    data: { userId: userId }
  });
}


openEditProfileDialog(event: any): void {
  // Obtiene el ID desde el elemento del botón que dispara el evento
  const id = event.target.parentElement.id;

  if (id) {
    // Llama al servicio para obtener los datos del usuario usando el ID
    this.usuarioService.getUsuarioId(id).subscribe({
      next: (data) => {
        console.log('Data llegada:', data);
        // Abre el diálogo con los datos obtenidos
        const dialogRef = this.dialog.open(EditPerfilUsuarioRComponent, {
          width: '800px',
          height: '700px',
          data: { usuarioId: id } // Pasa el ID del usuario al diálogo
        });

        // Maneja el resultado después de que el diálogo se cierre
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          this.obtenerUsuarios();
        });
      },
      error: (error) => {
        console.log(error);
        // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    });
  } else {
    console.error('No se pudo obtener el ID del usuario');
  }
 }


 clearFilters(): void {
  this.filtro = '';
  this.filtroPuntaje = '';
  this.filtroCargo = '';
  this.selectedfechaPostulacion = null;
  this.selectedAniosExpRange = [1, 10];
  this.isIrrelevant = true;
  this.selectedSueldoRange = [1, 5000000];
  this.selectedCargo = 0;
  this.selectedCategoria = 0;
  this.selectedProducto = 0;
  this.selectedVersion = 0;
  this.selectedAniosExp = 0;
  this.selectedProductoNombre = "";
  this.selectedEstado = '';
  this.inputContent = false;
  this.lastYears = 0;
  this.resultadosExam = [];
  this.selectedOption = '';
  this.selectedNivel = 0;
  this.isSueldoSliderEnabled = true;
  this.selectedPorcentajeAprobacion = null;
  this.porcentajeAprobacion = 0;

  // Vuelve a cargar o filtrar los datos según sea necesario
  this.filterData();
}





 }


function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}
