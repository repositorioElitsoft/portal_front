import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';

const routes: Routes = [
  {path:'', redirectTo:'datos_personales', pathMatch:'full'},
  {path:'datos_personales', component:DatosPersonalesComponent},
  {path:'herramientas-tecnologias', component:HerramientasTecnologiasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
