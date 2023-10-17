import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Examen } from 'src/app/interface/examen.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { Usuario } from 'src/app/interface/user.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { ExamenService } from 'src/app/service/examen.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';

import Swal from 'sweetalert2';

const ELEMENT_DATA: Examen[] = [];


@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['usr_nom', 'usr_tel', 'usr_email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: Examen[] = [];
  usuarios: Usuario[] = [];
  categorias: CategoriaProducto[] = [];


  selectedAniosExpRange: number[] = [1, 10];


  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examenService: ExamenService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
 
    private productoService: ProductoService
  ) {}


  ngOnInit(): void {
    this.getExams();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterData() {
    let filteredArray = this.originalDataCopy;
  
    // Filtro por producto
    /*
    if (this.selectedProducto > 0) {
      const selectedProduct = this.productos.find(producto => producto.prd_id === this.selectedProducto);
      if (selectedProduct) {
        filteredArray = filteredArray.filter(element => element.usr_herr.includes(selectedProduct.prd_nom));
      }
    }*/
  

    console.log('Filtro de años de experiencia:', this.selectedAniosExpRange);
    console.log('Usuarios filtrados:', filteredArray);
  
    this.dataSource.data = filteredArray;
  }

  filterInput() {
    let filteredArray = this.originalDataCopy;
/*
    if (this.filtro && this.filtro.trim() !== '') {
      const filtroLowerCase = this.filtro.toLowerCase();
      filteredArray = filteredArray.filter(element => element.toLowerCase().includes(filtroLowerCase));
    }
*/
    this.dataSource.data = filteredArray;
  }
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  

  getExams(): void {
    this.examenService.obtenerExamenesActivos().subscribe({
      next:(data: Examen[]) => {
        console.log('Data llegada:', data);
        const examenes = data

        this.originalDataCopy = examenes;
        this.dataSource.data = examenes;
      },
      error:(error) => {
        console.log(error);
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

  editExamen(event: any){
    const email = event.target.parentElement.id
    console.log(email)

    this.router.navigate(["/reclutador/view-perfil-usuario-r/"+email])
  }
}
