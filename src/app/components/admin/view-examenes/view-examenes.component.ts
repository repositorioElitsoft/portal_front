import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategory} from 'src/app/interface/categoria-prod.interface';
import { User } from 'src/app/interface/user.interface';
import { AdvertenciaEliminarComponent } from '../../shared/advertencia-eliminar/advertencia-eliminar.component';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';
import { Product } from 'src/app/interface/producto.interface';
import { ProductoService } from 'src/app/service/producto.service';

const ELEMENT_DATA: Product[] = [];
@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['Producto', 'Categoria','Acciones'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: Product[] = [];
  usuarios: User[] = [];
  categorias: ProductCategory[] = [];
  selectedAniosExpRange: number[] = [1, 10];
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductoService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    
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
   editExamen(event: any) {
    const examenId = event.target.parentElement.id;
     if (examenId) {
      this.productoService.obtenerExamen(examenId).subscribe({
         next:(data) => {
           const dialogRef = this.dialog.open(ExamenModalComponent, {
             width: '800px', 
             height: '700px',
             data: data
           });
          dialogRef.afterClosed().subscribe((result) => {
           });
         },
         error:(error) => {
           console.log(error);
         }
       });
     }
   }
  
  getProducts(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (data: Product[]) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  viewPreguntas(event: any, productId: number): void {
    // Llamada al servicio para obtener preguntas
    this.productoService.obtenerPreguntasPorProducto(productId).subscribe({
      next: (preguntas: any) => {
        const dialogRef = this.dialog.open(ExamenModalComponent, {
          width: '800px',
          height: '700px',
          data: { preguntas: preguntas },
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  openDialogEliminar(event: any) {
    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productoService.eliminarExamen(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("Examen eliminado","Cerrar",{
              duration: 4000
            })
            this.getProducts();
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

    dialogRef.componentInstance?.examenActualizado.subscribe(() => {
      this.getProducts();
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
