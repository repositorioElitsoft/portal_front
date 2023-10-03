import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { CertificacionService } from 'src/app/service/certificacion.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { NivelService } from 'src/app/service/nivel.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interface/user.interface';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Certificacion } from 'src/app/interface/certificacion.interface';
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Niveles } from 'src/app/interface/niveles.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';

@Component({
  selector: 'app-table-herramientas',
  templateUrl: './table-herramientas.component.html',
  styleUrls: ['./table-herramientas.component.css']
})
export class TableHerramientasComponent implements OnInit {

  herramienta: Herramientas = {
    herr_usr_anos_exp: '',
    herr_usr_vrs: '',
    usr_id: -1
  };

  herramientas: HerramientaData[] = [
    {
      herr_usr_anos_exp: '',
      herr_is_cert: false,
      herr_nvl: '', 
      versionProducto: {
        vrs_id: 0
      }
    }
  ]

  usuario: Usuario = {
    usr_id: -1,
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_pass: '',
    usr_tel: '',
    usr_url_link: '',
    pais_nom: '',
    pais: { pais_id: undefined,
            pais_nom: '' } // Asegúrate de tener una instancia de Pais aquí
  };

  selectedCategoriaId: number | undefined;
  selectedProductoId: number | undefined;
  selectedVersionId: number = 0;
  certificadoSeleccionado: boolean = false;
  selectedLevel: string = "";
  selectedNivelId: number | undefined;

  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  versions: VersionProducto[] = [];
  certificados: Certificacion[] = [];
  niveles: Niveles[] = [];
  public rows: any[] = [];

  @ViewChild('btnradio1', { static: true }) btnradio1!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio2', { static: true }) btnradio2!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio3', { static: true }) btnradio3!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio4', { static: true }) btnradio4!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio5', { static: true }) btnradio5!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private herramientasService: HerramientasService,
    private categoriaProductoService: CategoriaProductoService,
    private certificacionService: CertificacionService,
    private nivelService: NivelService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private usuarioService:UsuarioService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const usr_id = params['usr_id'];
      console.log(usr_id)
      this.usuario.usr_id = usr_id
      if (usr_id) {
        this.herramienta.usr_id = usr_id;
        if (typeof usr_id === 'number') { // Verificar si usr_id es un número
          this.obtenerDatosUsuario(usr_id);
        }
      }
      this.obtenerCategorias();
      this.obtenerProductos();
      // this.getVersion();
      this.obtenerCertificaciones();
      this.obtenerNiveles();
    });
  }

  obtenerDatosUsuario(usuarioId: number) {
    this.usuarioService.obtenerUsuarioPorId(usuarioId).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario; // Almacena los datos del usuario
      },
      (error) => {
        console.log('Error al obtener los datos del usuario:', error);
      }
    );
  }


  obtenerCategorias() {
    this.categoriaProductoService.getCategoriasDisponibles().subscribe(
      (data: CategoriaProducto[]) => {
        this.categorias = data;
      },
      (error) => {
        console.log('Error al obtener categorías:', error);
      }
    );
  }

  obtenerProductos() {
    if (!this.selectedCategoriaId) {
      // Si no hay categoría seleccionada, no se realiza la llamada
      this.productos = []; // Limpiamos el arreglo de productos
      return;
    }

    this.productoService.obtenerProductosPorCategoria(this.selectedCategoriaId).subscribe(
      (data: Producto[]) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.log('Error al obtener productos:', error);
      }
    );
  }
    
  getVersion() {
    if (!this.selectedProductoId) {
      return;
    }
    
    console.log(`Id del producto seleccionado: ${this.selectedProductoId}`)
    this.productoService.getVersionByProduct(this.selectedProductoId).subscribe(
      (data: VersionProducto[]) => {
        this.versions = data;
        console.log(`Versiones cargadas: ${JSON.stringify(this.versions)}`);
      },
      (error) => {
        console.log(`Error al obtener las versiones: ${error}`);
      }
    );
  }

  obtenerCertificaciones() {
    this.certificacionService.obtenerTodosLosCertificados().subscribe(
      (data: Certificacion[]) => {
        this.certificados = data;
        console.log('Certificaciones cargadas:', this.certificados);
      },
      (error) => {
        console.log('Error al obtener certificaciones:', error);
      }
    );
  }

  obtenerNiveles() {
    this.nivelService.listarNiveles().subscribe(
      (data: Niveles[]) => {
        this.niveles = data;
        console.log('Niveles cargados:', this.niveles);
      },
      (error) => {
        console.log('Error al obtener niveles:', error);
      }
    );
  }

  navigateToRoute(route: string) {
    // Navegamos a la ruta proporcionada
    this.router.navigate([route]);
  }

  // Agregamos eventos a cada radio button y navegamos a la ruta correspondiente
  onRadio1Change() {
    this.navigateToRoute('/datos_personales');
  }

  onRadio2Change() {
    this.navigateToRoute('/herramientas-tecnologias');
  }

  onRadio3Change() {
    this.navigateToRoute('/informacion-academica');
  }

  onRadio4Change() {
    this.navigateToRoute('/informacion-laboral');
  }

  onRadio5Change() {
    this.navigateToRoute('/cargo-usuario');
  }

  guardarDatos() {
    // Verificamos si se ha seleccionado una categoría
    if (!this.selectedCategoriaId) {
      console.log('Seleccione una categoría antes de guardar.');
      return;
    }

    // Verificamos si se ha seleccionado un producto
    if (!this.selectedProductoId) {
      console.log('Seleccione un producto antes de guardar.');
      return;
    }

    // // Verificamos si se ha seleccionado una certificación
    // if (!this.selectedCertificadoId) {
    //   console.log('Seleccione una certificación antes de guardar.');
    //   return;
    // }

    // Verificamos si se ha seleccionado un nivel
    if (!this.selectedLevel) {
      console.log('Seleccione un nivel antes de guardar.');
      return;
    }

    // Verificamos si tenemos un usuario válido antes de guardar
    // if (!this.usuario || this.usuario.usr_id === undefined) {
    //   console.log('No se encontró un usuario válido.');
    //   return;
    // }

    // Completamos los datos de la herramienta con las selecciones
    this.herramientas[0].herr_usr_anos_exp = this.herramienta.herr_usr_anos_exp;
    this.herramientas[0].herr_is_cert = this.certificadoSeleccionado;
    this.herramientas[0].herr_nvl = this.selectedLevel;
    const selectedVersionId = Number(this.selectedVersionId);
    if (!isNaN(selectedVersionId)) {
      this.herramientas[0].versionProducto.vrs_id = selectedVersionId;
    } else {
      console.log(`Version seleccionada ${selectedVersionId}`)
      console.error('El valor seleccionado de versión no es un número válido.');
    }

    console.log(this.herramientas);

    // Llamamos al servicio para guardar la herramienta
    this.herramientasService.guardarHerramienta(this.herramientas).subscribe(
      (nuevaHerramienta: HerramientaData) => {
        this.usuarioService
        console.log('Herramienta guardada exitosamente:', nuevaHerramienta);
        // Puedes redirigir al usuario a otra página o realizar alguna otra acción después de guardar.
      },
      (error) => {
        console.log('Error al guardar herramienta:', error);
      }
    );
  }

  addRow() {
    this.rows.push({});
  }
}
