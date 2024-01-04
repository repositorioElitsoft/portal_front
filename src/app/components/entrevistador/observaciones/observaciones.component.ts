import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/user.interface';
import { ObservacionService } from 'src/app/service/observacionreclutador.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { ViewPerfilUsuarioEComponent } from '../view-perfil-usuario-e/view-perfil-usuario-e.component';
import { forkJoin } from 'rxjs';
import { ProductCategory} from 'src/app/interface/categoria-prod.interface';
import { Product} from 'src/app/interface/producto.interface';
import { ProductVersion} from 'src/app/interface/version-producto';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { ProductoService } from 'src/app/service/producto.service';
import { PreguntaService } from 'src/app/service/pregunta.service';

const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['usr_nom', 'usr_tel', 'usr_email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  resultados  = [];
  idUser: string = '';
  filtro: string = '';
  filtroPuntaje: string = '';
  originalDataCopy: Usuario[] = [];
  usuarios: Usuario[] = [];
  categorias: ProductCategory[] = [];
  productos: Product[] = [];
  versiones: ProductVersion[] = [];
  selectedAniosExpRange: number[] = [1, 10];
  isIrrelevant: boolean = true;
  selectedCategoria: number = 0;
  selectedProducto: number = 0;
  selectedVersion: number = 0;
  selectedAniosExp: number = 0;
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;
  lastYears: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
    private observacionReclutadorService: ObservacionService,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    private preguntaService: PreguntaService ){}

    ngOnInit(): void {
      this.obtenerUsuarios();
      this.getCategories();
      this.obtenerResultadosByUser();
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    obtenerUsuarios(): void {
      this.usuarioService.obtenerUsuarios().subscribe(
        (data: any[]) => {
          const usuarios = data
            .filter((usuario) => usuario.usr_rol === 'GUEST')
            .map((usuario) => ({
              usr_nom: usuario.usr_nom + " " + usuario.usr_ap_pat + " " + usuario.usr_ap_mat || '',
              usr_tel: usuario.usr_tel || '',
              usr_email: usuario.usr_email || '',
              usr_rol: usuario.usr_rol || '',
              usr_direcc:usuario.usr_direcc || '',
              usr_herr: usuario.herramientas
                .filter((herramienta: HerramientaData) => herramienta.versionProducto && herramienta.versionProducto.prd)
                .map((herramienta: HerramientaData) => herramienta.versionProducto.prd.name)
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
            }));
          this.originalDataCopy = usuarios;
          this.dataSource.data = usuarios;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    getCategories() {
      this.categoriaProductoService.getCategoriasDisponibles().subscribe(
        (data: ProductCategory[]) => {
          this.categorias = data;
        },
        () => {
          console.log('Error al obtener categorías:');
        }
      );
    }

    obtenerResultadosByUser() {
      this.preguntaService.obtenerResultadosByUser(this.idUser).subscribe(
        (data: any) => {
          this.resultados = data;
        },
        (error) => {
          console.error('Error al obtener resultados:', error);
        }
      );
    }
    getProductos(categoriaId: number){
      this.selectedProducto = 0;
      this.selectedVersion = 0;
      this.selectedProductoNombre = '';

      if (categoriaId) {
        this.productoService.obtenerProductosPorCategoria(categoriaId).subscribe(
          (productos: Product[]) => {
            this.productos = productos;
            this.selectedProducto = 0;
            this.versiones = [];
            this.originalDataCopy = this.dataSource.data;

            this.selectedProductoNombre = this.productos.find((producto) => producto.id === this.selectedProducto)?.name;
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

      }
    }
    getVersion(productoId: number) {
        if (productoId) {
          this.productoService.getVersionByProduct(productoId).subscribe(
            (data: ProductVersion[]) => {
              this.versiones = data;
            },
            (error) => {
              console.log('Error al cargar version ', error);
            }
          );
        }
    }
    openUserProfile(event: any) {
      const userId = event.currentTarget.id;
      console.log('User ID:', userId);
      forkJoin({
        observadores: this.observacionReclutadorService.obtenerCatObservacionesPorUsuarioId(userId),
        usuario: this.usuarioService.getUsuarioId(userId)
      }).subscribe({
        next: (resultados) => {
          const { observadores, usuario } = resultados;
          const dialogRef = this.dialog.open(ViewPerfilUsuarioEComponent, {
            data: { userId, observadores, usuario }, 
            height: '60vh',
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        },
        error: (error) => {
          console.error('Error al obtener datos del usuario:', error);
        }
      });
    }
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }











}
