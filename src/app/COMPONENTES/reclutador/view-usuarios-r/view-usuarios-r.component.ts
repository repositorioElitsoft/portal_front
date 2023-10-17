import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Usuario } from 'src/app/interface/user.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';

const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-view-usuarios-r',
  templateUrl: './view-usuarios-r.component.html',
  styleUrls: ['./view-usuarios-r.component.css'],
})

export class ViewUsuariosRComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['usr_nom', 'usr_tel', 'usr_email', 'acciones', 'usr_herr', 'herr_ver', 'herr_exp'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: Usuario[] = [];
  categorias: CategoriaProducto[] = [];
  productos: Producto[] = [];
  versiones: VersionProducto[] = [];

  selectedCategoria: number = 0;
  selectedProducto: number = 0;
  selectedVersion: number = 0;
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService
  ) {}


  ngOnInit(): void {
    this.obtenerUsuarios();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: any[]) => {
        console.log('data:', data);
        const usuarios = data.map((usuario) => ({
          usr_nom: usuario.usr_nom,
          usr_tel: usuario.usr_tel || '',
          usr_email: usuario.usr_email || '',
          usr_herr: usuario.herramientas,

          herr_ver: usuario.herramientas,

          herr_exp: usuario.herramientas, //TODO: Agregar los años de experiencia


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


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
