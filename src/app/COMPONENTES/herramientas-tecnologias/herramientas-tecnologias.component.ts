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


@Component({
  selector: 'app-herramientas-tecnologias',
  templateUrl: './herramientas-tecnologias.component.html',
  styleUrls: ['./herramientas-tecnologias.component.css']
})
export class HerramientasTecnologiasComponent implements OnInit {

  herramienta: Herramientas = {
    herr_usr_anos_exp: '',
    herr_usr_vrs: '',
    usr_id: -1
  };

  // usuario: Usuario = {
  //   usr_id: -1,
  //   usr_rut: '',
  //   usr_nom: '',
  //   usr_ap_pat: '',
  //   usr_ap_mat: '',
  //   usr_email: '',
  //   usr_pass: '',
  //   usr_tel: '',
  //   usr_url_link: '',
  //   pais_nom: '',
  //   pais: { pais_id: undefined,
  //           pais_nom: '' } // Asegúrate de tener una instancia de Pais aquí
  // };


  selectedCategoriaId: number | undefined;
  selectedProductoId: number | undefined;
  selectedCertificadoId: number | undefined;
  selectedNivelId: number | undefined;


  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  certificados: Certificacion[] = [];
  niveles: Niveles[] = [];

  @ViewChild('btnradio1', { static: true }) btnradio1!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio2', { static: true }) btnradio2!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio3', { static: true }) btnradio3!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio4', { static: true }) btnradio4!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio5', { static: true }) btnradio5!: ElementRef<HTMLInputElement>;

  constructor(private router: Router,
    private herramientasService: HerramientasService,
    private categoriaProductoService: CategoriaProductoService,
    private certificacionService: CertificacionService,
    private nivelService: NivelService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private usuarioService:UsuarioService) { }
   
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const usr_id = params['usr_id'];
        console.log(usr_id)
        // this.usuario.usr_id = usr_id
        if (usr_id) {
          this.herramienta.usr_id = usr_id;
        }
        this.obtenerCategorias();
        this.obtenerProductos();
        this.obtenerCertificaciones();
        this.obtenerNiveles();
      });
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
          console.log('idCategoria', this.selectedCategoriaId)
          this.productos = data;
          console.log('Productos cargados:', this.productos);
  
        },
        (error) => {
          console.log('Error al obtener productos:', error);
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

    // Verificamos si se ha seleccionado una certificación
    if (!this.selectedCertificadoId) {
      console.log('Seleccione una certificación antes de guardar.');
      return;
    }

    // Verificamos si se ha seleccionado un nivel
    if (!this.selectedNivelId) {
      console.log('Seleccione un nivel antes de guardar.');
      return;
    }

    // Verificamos si tenemos un usuario válido antes de guardar
    // if (!this.usuario || this.usuario.usr_id === undefined) {
    //   console.log('No se encontró un usuario válido.');
    //   return;
    // }

    // Completamos los datos de la herramienta con las selecciones
    this.herramienta.cat_prod_id = this.selectedCategoriaId;
    this.herramienta.prd_id = this.selectedProductoId;
    this.herramienta.cert_id = this.selectedCertificadoId;
    this.herramienta.nvl_id = this.selectedNivelId;

    // Llamamos al servicio para guardar la herramienta
    // this.herramientasService.guardarHerramienta(this.herramienta, this.usuario.usr_id).subscribe(
    //   (nuevaHerramienta: Herramientas) => {
    //     console.log('Herramienta guardada exitosamente:', nuevaHerramienta);
    //     // Puedes redirigir al usuario a otra página o realizar alguna otra acción después de guardar.
    //   },
    //   (error) => {
    //     console.log('Error al guardar herramienta:', error);
    //   }
    // );
  }
}


