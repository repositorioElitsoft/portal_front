import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InformacionLaboralComponent } from './COMPONENTES/informacion-laboral/informacion-laboral.component';
import { InformacionAcademicaComponent } from './COMPONENTES/informacion-academica/informacion-academica.component';
import { CargoUsuarioComponent } from './COMPONENTES/cargo-usuario/cargo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosPersonalesComponent,
    HerramientasTecnologiasComponent,
    InformacionLaboralComponent,
    InformacionAcademicaComponent,
    CargoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({



      positionClass: 'toast-top-center'

    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
