import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserService } from 'src/app/service/user.service';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { ViewPerfilUsuarioEComponent } from '../view-perfil-usuario-e/view-perfil-usuario-e.component';
import { forkJoin } from 'rxjs';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { ProductoService } from 'src/app/service/producto.service';
import { PreguntaService } from 'src/app/service/pregunta.service';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['name', 'phone', 'email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  resultados  = [];
  idUser: string = '';
  filtro: string = '';
  filtroPuntaje: string = '';
  originalDataCopy: any[] = [];
  usuarios: any[] = [];
  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  versiones: VersionProducto[] = [];
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

  constructor(private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar,
    private observationService: ObservacionService,
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
      this.userService.obtenerUsuarios().subscribe(
        (data: any[]) => {
          const usuarios = data
            .filter((usuario) => usuario.roles === 'GUEST')
            .map((usuario) => ({
              name: usuario.name + " " + usuario.firstLastname + " " + usuario.secondLastname || '',
              phone: usuario.phone || '',
              email: usuario.email || '',
              roles: usuario.roles || '',
              address:usuario.address || '',
              tools: usuario.herramientas
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
              id: usuario.id,
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
        (data: CategoriaProducto[]) => {
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
          (productos: Producto[]) => {
            this.productos = productos;
            this.selectedProducto = 0;
            this.versiones = [];
            this.originalDataCopy = this.dataSource.data;

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

      }
    }
    getVersion(productoId: number) {
        if (productoId) {
          this.productoService.getVersionByProduct(productoId).subscribe(
            (data: VersionProducto[]) => {
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
        observadores: this.observationService.obtenerCatObservacionesPorUsuarioId(userId),
        usuario: this.userService.getUsuarioId(userId)
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
