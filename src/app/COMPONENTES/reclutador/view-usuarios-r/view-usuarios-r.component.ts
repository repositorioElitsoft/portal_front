import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Usuario } from 'src/app/interface/user.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';

const ELEMENT_DATA: Usuario[] = [
  // {herramientas: 'asd'}
];

@Component({
  selector: 'app-view-usuarios-r',
  templateUrl: './view-usuarios-r.component.html',
  styleUrls: ['./view-usuarios-r.component.css'], 
})

export class ViewUsuariosRComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['usr_nom', 'usr_tel', 'usr_email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtrados: string = '';
  originalDataCopy: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {

  }
  
  filter(event: Event) {
    this.filtrados = (event.target as HTMLInputElement).value.toLowerCase();
  
    const filteredArray = this.originalDataCopy.filter((element) => {
      if (this.filtrados.trim() === "") {
          return true;  
      }
      if (element.usr_herr.toLowerCase().includes(this.filtrados)) {
        return true; 
      }
      return false;
    });
    this.dataSource.data = filteredArray;
  }
  
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: any[]) => {
        const usuarios = data.map((usuario) => ({
          usr_nom: usuario.usr_nom,
          usr_tel: usuario.usr_tel || '',
          usr_email: usuario.usr_email || '',
          usr_herr: usuario.herramientas
            .filter((herramienta: HerramientaData) => herramienta.versionProducto && herramienta.versionProducto.prd)
            .map((herramienta: HerramientaData) => herramienta.versionProducto.prd.prd_nom)
            .join(', '),
        }));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.originalDataCopy = usuarios;
        this.dataSource.data = usuarios;
      },
      (error) => {
        console.log(error);
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
