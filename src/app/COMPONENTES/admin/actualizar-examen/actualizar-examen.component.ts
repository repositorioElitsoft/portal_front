import  Swal  from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/SERVICE/examen.service';
import { CategoriaService } from 'src/app/SERVICE/categoria.service';


@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService,
    private categoriaService:CategoriaService,
    private router:Router) { }

    exam_id = 0;
    examen:any;
    categorias:any;

  ngOnInit(): void {
    // Lógica para obtener y mostrar los datos del examen a actualizar
    this.exam_id = this.route.snapshot.params['exam_id'];
    this.examenService.obtenerExamen(this.exam_id).subscribe(
      (data) => {
        this.examen = data;
        console.log(this.examen);
      },
      (error) => {
        console.log(error);
      }
    )
// Lógica para cargar las categorías
    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    )

  }
 // Lógica para actualizar el examen
  public actualizarDatos(){
    this.examenService.actualizarExamen(this.examen).subscribe(
      (data) => {
        Swal.fire('Examen actualizado','El examen ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/view-examenes']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el examen','error');
        console.log(error);
      }
    )
  }

  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-examenes']);
  }

}
