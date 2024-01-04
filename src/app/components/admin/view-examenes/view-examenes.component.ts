import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Examen } from 'src/app/interface/examen.interface';
import { User } from 'src/app/interface/user.interface';
import { ExamenService } from 'src/app/service/examen.service';
import { AdvertenciaEliminarComponent } from '../../shared/advertencia-eliminar/advertencia-eliminar.component';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';

const ELEMENT_DATA: Examen[] = [];
@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = ['name', 'phone', 'email', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: Examen[] = [];
  usuarios: User[] = [];
  categorias: CategoriaProducto[] = [];
  selectedAniosExpRange: number[] = [1, 10];
  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examenService: ExamenService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
      this.examenService.obtenerExamen(examenId).subscribe({
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
  getExams(): void {
    this.examenService.listarCuestionarios().subscribe({
      next:(data: Examen[]) => {
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
      if(result){
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

    dialogRef.componentInstance?.examenActualizado.subscribe(() => {
      this.getExams();
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
