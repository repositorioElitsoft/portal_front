import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa el ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';
import { ToastrModule } from 'ngx-toastr';
import { InformacionLaboralComponent } from './COMPONENTES/informacion-laboral/informacion-laboral.component';
import { InformacionAcademicaComponent } from './COMPONENTES/informacion-academica/informacion-academica.component';
import { CargoUsuarioComponent } from './COMPONENTES/cargo-usuario/cargo-usuario.component';
import { AppNavbarComponent } from './COMPONENTES/shared/app-navbar/app-navbar.component';
import { AppSidebarComponent } from './COMPONENTES/shared/app-sidebar/app-sidebar.component';
import { AppFooterComponent } from './COMPONENTES/shared/app-footer/app-footer.component';
import { SidebarUserComponent } from './COMPONENTES/shared/sidebar-user/sidebar-user.component';
import { TableHerramientasComponent } from './COMPONENTES/shared/table-herramientas/table-herramientas.component';
import { SidebarUserDeskComponent } from './COMPONENTES/shared/sidebar-userdesk/sidebar-userdesk.component';
import { AppSidebar2Component } from './COMPONENTES/shared/app-sidebar2/app-sidebar2.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
import { ValidarMailComponent } from './COMPONENTES/validar-mail/validar-mail.component';
import { PeticionRestaurarPassComponent } from './COMPONENTES/peticion-restaurar-pass/peticion-restaurar-pass.component';
import { RestaurarPassComponent } from './COMPONENTES/restaurar-pass/restaurar-pass.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDashboardComponent } from './COMPONENTES/pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './COMPONENTES/pages/profile/profile.component';
import { SidebarComponent } from './COMPONENTES/pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './COMPONENTES/pages/admin/welcome/welcome.component';
import { SidebarComponent as UserSidebar } from './COMPONENTES/pages/user/sidebar/sidebar.component';
import { LoadExamenComponent } from './COMPONENTES/pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './COMPONENTES/pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './COMPONENTES/pages/user/start/start.component';
import { UserProfileComponent } from './COMPONENTES/pages/user-profile/user-profile.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { EstadisticasComponent } from './COMPONENTES/reclutador/estadisticas/estadisticas.component';


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
    ViewPerfilUsuarioRComponent,    
    DatosPersonalesComponent,
    HerramientasTecnologiasComponent,
    InformacionLaboralComponent,
    InformacionAcademicaComponent,
    CargoUsuarioComponent,
    AppNavbarComponent,
    AppSidebarComponent,
    AppSidebar2Component,
    AppFooterComponent,
    SidebarUserDeskComponent,
    SidebarUserComponent,
    TableHerramientasComponent,
    ValidarMailComponent,
    PeticionRestaurarPassComponent,
    RestaurarPassComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriasComponent,
    AddCategoriaComponent,
    ViewExamenesComponent,
    AddExamenComponent,
    ActualizarExamenComponent,
    ViewExamenPreguntasComponent,
    AddPreguntaComponent,
    ActualizarPreguntaComponent,
    UserSidebar,
    LoadExamenComponent,
    InstruccionesComponent,
    StartComponent,
    UserProfileComponent,
    EstadisticasComponent,
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
