import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';
import { InformacionAcademicaComponent } from './COMPONENTES/informacion-academica/informacion-academica.component';
import { InformacionLaboralComponent } from './COMPONENTES/informacion-laboral/informacion-laboral.component';
import { CargoUsuarioComponent } from './COMPONENTES/cargo-usuario/cargo-usuario.component';

const routes: Routes = [
  {path:'', redirectTo:'datos_personales', pathMatch:'full'},
  {path:'datos_personales', component:DatosPersonalesComponent},
  {path:'herramientas-tecnologias', component:HerramientasTecnologiasComponent},
  {path:'informacion-academica', component:InformacionAcademicaComponent},
  {path:'informacion-laboral', component:InformacionLaboralComponent},
  {path:'cargo-usuario', component:CargoUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
