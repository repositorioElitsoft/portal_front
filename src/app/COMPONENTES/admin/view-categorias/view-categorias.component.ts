import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { AdvertenciaEliminarComponent } from '../../shared/advertencia-eliminar/advertencia-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaExamen } from 'src/app/interface/categoria-examen.interface';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';


const ELEMENT_DATA: CategoriaExamen[] = [];


@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['title', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: CategoriaExamen[] = [];
  selectedAniosExpRange: number[] = [1, 10];
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriaExamenService: CategoriaService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  openDialogEliminar(event: any) {
    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result){
        this.categoriaExamenService.eliminarCategoria(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("Categoría eliminada","Cerrar",{
              duration: 4000
            })
            this.getExamCategories();
          },
          error:()=>{
            this._snackBar.open("Error al eliminar categoría","Cerrar",{
              duration: 4000
            })
          }
        })
      }
    });
  }


  ngOnInit(): void {
    this.getExamCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterData() {
    let filteredArray = this.originalDataCopy;
    this.dataSource.data = filteredArray;
  }

  filterInput() {
    let filteredArray = this.originalDataCopy;
    this.dataSource.data = filteredArray;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


  getExamCategories(): void {
    this.categoriaExamenService.listarCategorias().subscribe({
      next:(data: CategoriaExamen[]) => {
        console.log('Data llegada:', data);

        this.originalDataCopy = data;
        this.dataSource.data = data;
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


  editCategoria(event: any) {
    // Accede directamente al ID desde el botón que dispara el evento usando currentTarget
    const categoriaId = event.currentTarget.id;

    if (categoriaId) {
      this.categoriaExamenService.getCategoria(categoriaId).subscribe({
        next: (data) => {
          console.log('Data llegada:', data);
          // Abrir el diálogo con los datos obtenidos
          const dialogRef = this.dialog.open(AddCategoriaComponent, {
            width: '800px',
            height: '400px',
            data: data // Pasar los datos obtenidos al diálogo
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            this.getExamCategories();          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.error('No se pudo obtener el ID de la categoría');
    }
  }


  addNewCategory(event: Event) {
    this.dialog.open(AddCategoriaComponent, {
      width: '800px',
      height: '400px'
    });
  }

}
