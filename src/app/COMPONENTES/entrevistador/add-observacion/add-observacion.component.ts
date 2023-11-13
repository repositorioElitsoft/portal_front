import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observacion } from 'src/app/interface/observacion.interface';
@Component({
  selector: 'app-add-observacion',
  templateUrl: './add-observacion.component.html',
  styleUrls: ['./add-observacion.component.css']
})
export class AddObservacionComponent implements OnInit {

  nuevaObservacion: Observacion = { obs_categoria: '', obs_texto: '', obs_fecha_creacion: new Date(), obs_final: '' };

  constructor(public dialogRef: MatDialogRef<AddObservacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  guardarObservacion() {
    this.dialogRef.close(this.nuevaObservacion);
  }

  ngOnInit(): void {

  }
}
