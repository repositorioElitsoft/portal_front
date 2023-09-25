import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa el ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { HttpClientModule } from '@angular/common/http';
import { IniciarSesionComponent } from './COMPONENTES/iniciar-sesion/iniciar-sesion.component';
import { WelcomeAdminComponent } from './COMPONENTES/admin/welcome-admin/welcome-admin.component';
import { DashboardComponent } from './COMPONENTES/admin/dashboard/dashboard.component';
import { ProfileAdminComponent } from './COMPONENTES/admin/profile-admin/profile-admin.component';
import { SidebarAdminComponent } from './COMPONENTES/admin/sidebar-admin/sidebar-admin.component';
import { ViewCategoriasComponent } from './COMPONENTES/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './COMPONENTES/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './COMPONENTES/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './COMPONENTES/admin/add-examen/add-examen.component';
import { ActualizarCategoriaComponent } from './COMPONENTES/admin/actualizar-categoria/actualizar-categoria.component';
import { ActualizarExamenComponent } from './COMPONENTES/admin/actualizar-examen/actualizar-examen.component';
import { AddPreguntaComponent } from './COMPONENTES/admin/add-pregunta/add-pregunta.component';
import { ViewExamenPreguntasComponent } from './COMPONENTES/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ActualizarPreguntaComponent } from './COMPONENTES/admin/actualizar-pregunta/actualizar-pregunta.component';
import { ViewUsuariosComponent } from './COMPONENTES/admin/view-usuarios/view-usuarios.component';
import { ViewPerfilUsuarioComponent } from './COMPONENTES/admin/view-perfil-usuario/view-perfil-usuario.component';
import { SidebarRComponent } from './COMPONENTES/reclutador/sidebar-r/sidebar-r.component';
import { DashboardRComponent } from './COMPONENTES/reclutador/dashboard-r/dashboard-r.component';
import { WelcomeReclutadorComponent } from './COMPONENTES/reclutador/welcome-reclutador/welcome-reclutador.component';
import { ProfileRComponent } from './COMPONENTES/reclutador/profile-r/profile-r.component';
import { ViewUsuariosRComponent } from './COMPONENTES/reclutador/view-usuarios-r/view-usuarios-r.component';
import { ViewPerfilUsuarioRComponent } from './COMPONENTES/reclutador/view-perfil-usuario-r/view-perfil-usuario-r.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    IniciarSesionComponent,
    WelcomeAdminComponent,
    DashboardComponent,
    ProfileAdminComponent,
    SidebarAdminComponent,
    ViewCategoriasComponent,
    AddCategoriaComponent,
    ViewExamenesComponent,
    AddExamenComponent,
    ActualizarCategoriaComponent,
    ActualizarExamenComponent,
    AddPreguntaComponent,
    ViewExamenPreguntasComponent,
    ActualizarPreguntaComponent,
    ViewUsuariosComponent,
    ViewPerfilUsuarioComponent,
    SidebarRComponent,
    DashboardRComponent,
    WelcomeReclutadorComponent,
    ProfileRComponent,
    ViewUsuariosRComponent,
    ViewPerfilUsuarioRComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule // Agrega el ReactiveFormsModule a los imports del módulo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
