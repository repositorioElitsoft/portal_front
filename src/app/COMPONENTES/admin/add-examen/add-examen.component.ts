import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ExamenService } from 'src/app/service/examen.service';
import { MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ExamenModalComponent } from '../examen-modal/examen-modal.component';
import { NivelService } from 'src/app/service/nivel.service';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {
  categorias:any = [];
  niveles:any=[];
  examenData = {
    exam_titl:'',
    exam_desc:'',
    exam_ptos_max:'',
    exam_n_preg:'',
    activo:true,
    categoria:{
      cat_exam_id:''
    }
  }
  constructor(
    private categoriaService:CategoriaService,
    private examenService:ExamenService,
    private dialog: MatDialog,
    private nivelservice: NivelService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )

    this.nivelservice.listarNiveles().subscribe(
      (data : any)=> {
        this.niveles = data;
        console.log(this.niveles);
      },
      (error)=> {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar los niveles', 'error');
      }
    )
  }

  guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.exam_titl.trim() == '' || this.examenData.exam_titl == null){
      alert('El título es requerido');
      return;
    }
    this.examenService.agregarExamen(this.examenData).subscribe(
      (data) => {
        console.log(data);

        Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
        this.examenData = {
         exam_titl:'',
         exam_desc:'',
         exam_ptos_max:'',
         exam_n_preg:'',
         activo:true,
         categoria:{
         cat_exam_id:''
          }
                 }
        this.router.navigate(['/admin/view-examenes']);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Error al guardar el examen','error');
      }
    )
  }
  openExamenModal() {
    const dialogRef = this.dialog.open(ExamenModalComponent, {
      width: '800px', 
      height: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Esta función se ejecutará cuando se cierre el modal, puedes manejar los resultados aquí si es necesario.
    });
  }
  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-examenes']);
  }
}
