import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { Usuario } from 'src/app/interface/user.interface';

const ELEMENT_DATA: Usuario[] = [];

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
    private router: Router) { }


  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  filter(event: Event) {
    this.filtrados = (event.target as HTMLInputElement).value;
    const filteredArray = this.originalDataCopy.filter((element) => {
      if (element.usr_nom && typeof element.usr_nom === 'string') {
        return element.usr_nom.toLowerCase().includes(this.filtrados.toLowerCase());
      }
      return false;
    });
    console.log('Dentro de filteredArray', filteredArray);
    console.log('Original Data:', this.originalDataCopy);
    console.log('valor del input:', this.filtrados);
    console.log(this.filtrados)
    this.dataSource.data = filteredArray;
  }
  
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: any[]) => {
        console.log('Respuesta:', data)
        const usuarios = data.map((usuario) => ({
          usr_nom: usuario.usr_nom,
          usr_tel: usuario.usr_tel || '',
          usr_email: usuario.usr_email || '',
        }));

        this.originalDataCopy = usuarios;
        this.dataSource.data = usuarios;
      },
      (error) => {
        console.log(error);
      }
    );
  }

    /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
