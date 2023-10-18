import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { AdvertenciaEliminarComponent } from '../../shared/advertencia-eliminar/advertencia-eliminar.component';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';

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
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private productoService: ProductoService,
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
  
  editExamen(event: any) {
    const examenId = event.target.parentElement.id;
    const examen: Examen | undefined = undefined;

    if (examenId) {
      this.examenService.obtenerExamen(examenId).subscribe({
        next:(data) => {
          console.log('Data llegada:', data);
          const examenes = data 
          const dialogRef = this.dialog.open(ExamenModalComponent, {
            width: '800px', 
            height: '700px',
            data: data
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        },
        error:(error) => {
          console.log(error);
        }
      });
    }
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

  openDialogEliminar(event: any) {
    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result){
        //#endregionconsole.log()
        this.examenService.eliminarExamen(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("Examen eliminado","Cerrar",{
              duration: 4000
            })
            this.getExams();
          },
          error:(err)=>{
            console.log(err)
            this._snackBar.open("Error al eliminar examen","Cerrar",{
              duration: 4000
            })
          }
        })
      }
    });
  }

  saveExamen() {
    const dialogRef = this.dialog.open(ExamenModalComponent, {
      width: '800px', 
      height: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
