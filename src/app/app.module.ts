import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { RegistrarComponent } from './components/register/registrar/registrar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IniciarSesionComponent } from './components/login/iniciar-sesion/iniciar-sesion.component';
import { WelcomeAdminComponent } from './components/admin/welcome-admin/welcome-admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileAdminComponent } from './components/admin/profile-admin/profile-admin.component';
import { ViewCategoriasComponent } from './components/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './components/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './components/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './components/admin/add-examen/add-examen.component';
import { AddPreguntaComponent } from './components/admin/add-pregunta/add-pregunta.component';
import { ViewExamenPreguntasComponent } from './components/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ViewUsuariosComponent } from './components/admin/view-usuarios/view-usuarios.component';
import { ViewPerfilUsuarioComponent } from './components/admin/view-perfil-usuario/view-perfil-usuario.component';
import { SidebarRComponent } from './components/reclutador/sidebar-r/sidebar-r.component';
import { DashboardRComponent } from './components/reclutador/dashboard-r/dashboard-r.component';
import { WelcomeReclutadorComponent } from './components/reclutador/welcome-reclutador/welcome-reclutador.component';
import { ProfileRComponent } from './components/reclutador/profile-r/profile-r.component';
import { ViewPerfilUsuarioRComponent } from './components/reclutador/view-perfil-usuario-r/view-perfil-usuario-r.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatosPersonalesComponent } from './components/user/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './components/user/herramientas-tecnologias/herramientas-tecnologias.component';
import { ToastrModule } from 'ngx-toastr';
import { InformacionLaboralComponent } from './components/user/informacion-laboral/informacion-laboral.component';
import { InformacionAcademicaComponent } from './components/user/informacion-academica/informacion-academica.component';
import { AppNavbarComponent } from './components/shared/app-navbar/app-navbar.component';
import { AppSidebarComponent } from './components/shared/app-sidebar/app-sidebar.component';
import { SidebarUserComponent } from './components/shared/sidebar-user/sidebar-user.component';
import { TableHerramientasComponent } from './components/shared/table-herramientas/table-herramientas.component';
import { SidebarUserDeskComponent } from './components/shared/sidebar-userdesk/sidebar-userdesk.component';
import { AppSidebar2Component } from './components/shared/app-sidebar2/app-sidebar2.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NumericOnlyDirective } from './directives/numeric-only.directive';
import { ValidarMailComponent } from './components/register/validar-mail/validar-mail.component';
import { PeticionRestaurarPassComponent } from './components/register/peticion-restaurar-pass/peticion-restaurar-pass.component';
import { RestaurarPassComponent } from './components/register/restaurar-pass/restaurar-pass.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { SidebarComponent as UserSidebar } from './components/user/sidebar/sidebar.component';
import { LoadExamenComponent } from './components/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './components/user/instrucciones/instrucciones.component';
import { StartComponent } from './components/user/start/start.component';
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
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { SidebarRResponsiveComponent } from './components/reclutador/sidebar-r-responsive/sidebar-r-responsive.component';
import { MatSortModule } from '@angular/material/sort';
import { AddUsuariosComponent } from './components/admin/add-usuarios/add-usuarios.component';
import { EstadisticasComponent } from './components/reclutador/estadisticas/estadisticas.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { ExamenModalComponent } from './components/admin/examen-modal/examen-modal.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AdvertenciaEliminarComponent } from './components/shared/advertencia-eliminar/advertencia-eliminar.component';
import { EditUserDialogComponent } from './components/admin/edit-user-dialog/edit-user-dialog.component';
import { CaracterOnlyDirective } from './directives/caracter-only-directive';
import { MatDialogModule } from '@angular/material/dialog';
import { WelcomeEntrevistadorComponent } from './components/entrevistador/welcome-entrevistador/welcome-entrevistador.component';
import { DashboardEComponent } from './components/entrevistador/dashboard-e/dashboard-e.component';
import { SidebarEComponent } from './components/entrevistador/sidebar-e/sidebar-e.component';
import { ObservacionesComponent } from './components/entrevistador/observaciones/observaciones.component';
import { SidebarEResponsiveComponent } from './components/entrevistador/sidebar-e-responsive/sidebar-e-responsive.component';
import { NavbarResponsiveExamenComponent } from './components/user/navbarexamen-responsive/navbarexamen-responsive.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CerrarSesionComponent } from './components/login/cerrar-sesion/cerrar-sesion.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UploadFilesComponent } from './components/reclutador/upload-files/upload-files.component';
import { EditLaboralComponent } from './components/user/add-employment/add-employment.component';
import { ViewFilesComponent } from './components/reclutador/view-files/view-files.component';
import { ViewPerfilUsuarioEComponent } from './components/entrevistador/view-perfil-usuario-e/view-perfil-usuario-e.component';
import { CurrencyFormatPipe } from './components/user/cargo-usuario/currency-format.pipe';
import {MatStepperModule} from '@angular/material/stepper';
import { EditPerfilUsuarioRComponent } from './components/reclutador/edit-perfil-usuario-r/edit-perfil-usuario-r.component';
import { SendMailToUsersDialogueComponent } from './components/reclutador/send-mail-to-users-dialogue/send-mail-to-users-dialogue.component';
import { ViewUsuariosRComponent } from './components/reclutador/view-usuarios-r/view-usuarios-r.component';
import { EditPerfilUsuarioAdminComponent } from './components/admin/edit-perfil-usuario-admin/edit-perfil-usuario-admin.component';
import { CargoUsuarioComponent } from './components/user/cargo-usuario/cargo-usuario.component';
import { AddStudyComponent } from './components/user/add-study/add-study.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    IniciarSesionComponent,
    WelcomeAdminComponent,
    DashboardComponent,
    ProfileAdminComponent,
    ViewCategoriasComponent,
    AddExamenComponent,
    ViewUsuariosComponent,
    ViewPerfilUsuarioComponent,
    SidebarRComponent,
    DashboardRComponent,
    WelcomeReclutadorComponent,
    ProfileRComponent,
    ViewPerfilUsuarioRComponent,
    DatosPersonalesComponent,
    HerramientasTecnologiasComponent,
    InformacionLaboralComponent,
    InformacionAcademicaComponent,
    CargoUsuarioComponent,
    AppNavbarComponent,
    EditPerfilUsuarioRComponent,
    AppSidebarComponent,
    CerrarSesionComponent,
    AppSidebar2Component,
    SidebarUserDeskComponent,
    TableHerramientasComponent,
    ValidarMailComponent,
    PeticionRestaurarPassComponent,
    RestaurarPassComponent,
    UserDashboardComponent,
    AddCategoriaComponent,
    ViewExamenesComponent,
    EditUserDialogComponent,
    EditPerfilUsuarioAdminComponent,
    CurrencyFormatPipe,
    ViewExamenPreguntasComponent,
    CaracterOnlyDirective,
    AddPreguntaComponent,
    UserSidebar,
    LoadExamenComponent,
    InstruccionesComponent,
    StartComponent,
    SidebarUserComponent,
    SidebarRResponsiveComponent,
    ExamenModalComponent,
    AddUsuariosComponent,
    EstadisticasComponent,
    AdvertenciaEliminarComponent,
    CaracterOnlyDirective,
    CurrencyFormatPipe,
    UploadFilesComponent,
    EditLaboralComponent,
    ViewFilesComponent,
    WelcomeEntrevistadorComponent,
    DashboardEComponent,
    SidebarEComponent,
    ObservacionesComponent,
    SidebarEResponsiveComponent,
    ViewPerfilUsuarioEComponent,
    NumericOnlyDirective,
    ViewUsuariosRComponent,
    AddStudyComponent,
    SendMailToUsersDialogueComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatBottomSheetModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSortModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    NavbarResponsiveExamenComponent,
    MatSliderModule,
    RouterOutlet,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    TextFieldModule,
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
