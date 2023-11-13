import { Component, Inject } from '@angular/core';
import { Observacion } from 'src/app/interface/observacion.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-observaciones',
  templateUrl: './view-observaciones.component.html',
  styleUrls: ['./view-observaciones.component.css']
})
export class ViewObservacionesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { observaciones: Observacion[] }) {}
}
