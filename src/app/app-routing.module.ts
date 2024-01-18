import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './components/register/registrar/registrar.component';
import { IniciarSesionComponent } from './components/login/iniciar-sesion/iniciar-sesion.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { WelcomeAdminComponent } from './components/admin/welcome-admin/welcome-admin.component';
import { ProfileAdminComponent } from './components/admin/profile-admin/profile-admin.component';
import { ViewCategoriasComponent } from './components/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './components/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './components/admin/view-examenes/view-examenes.component';
import { ViewExamenPreguntasComponent } from './components/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './components/admin/add-pregunta/add-pregunta.component';
import { ViewUsuariosComponent } from './components/admin/view-usuarios/view-usuarios.component';
import { ViewPerfilUsuarioComponent } from './components/admin/view-perfil-usuario/view-perfil-usuario.component';
import { DashboardRComponent } from './components/reclutador/dashboard-r/dashboard-r.component';
import { WelcomeReclutadorComponent } from './components/reclutador/welcome-reclutador/welcome-reclutador.component';
import { ProfileRComponent } from './components/reclutador/profile-r/profile-r.component';
import { ViewUsuariosRComponent } from './components/reclutador/view-usuarios-r/view-usuarios-r.component';
import { ViewPerfilUsuarioRComponent } from './components/reclutador/view-perfil-usuario-r/view-perfil-usuario-r.component';
import { HerramientasTecnologiasComponent } from './components/user/herramientas-tecnologias/herramientas-tecnologias.component';
import { InformacionAcademicaComponent } from './components/user/informacion-academica/informacion-academica.component';
import { InformacionLaboralComponent } from './components/user/informacion-laboral/informacion-laboral.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ValidarMailComponent } from './components/register/validar-mail/validar-mail.component';
import { PeticionRestaurarPassComponent } from './components/register/peticion-restaurar-pass/peticion-restaurar-pass.component';
import { RestaurarPassComponent } from './components/register/restaurar-pass/restaurar-pass.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { LoadExamenComponent } from './components/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './components/user/instrucciones/instrucc.component';
import { StartComponent } from './components/user/start/start.component';
import { AddUsuariosComponent } from './components/admin/add-usuarios/add-usuarios.component';
import { EstadisticasComponent } from './components/reclutador/estadisticas/estadisticas.component';
import { JobPositionUserComponent } from './components/user/job-position-user/job-position-user.component';
import { PortalViewComponent } from './components/user/portal-view/portal-view.component';
import { DatosPersonalesComponent } from './components/user/datos-personales/datos-personales.component';
import { DashboardEComponent } from './components/entrevistador/dashboard-e/dashboard-e.component';
import { WelcomeEntrevistadorComponent } from './components/entrevistador/welcome-entrevistador/welcome-entrevistador.component';
import { ObservacionesComponent } from './components/entrevistador/observaciones/observaciones.component';


const routes: Routes = [
  { path: 'restaurar', component: RestaurarPassComponent },

  { path: 'restaurar-contrasena', component: PeticionRestaurarPassComponent },

  { path: '', redirectTo: 'user/datos-personales', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'verificar-email', component: ValidarMailComponent },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_GUEST' },
    children: [
      { path: 'datos-personales', component: DatosPersonalesComponent },
      { path: 'herramientas-tecnologias', component: HerramientasTecnologiasComponent },
      { path: 'informacion-academica', component: InformacionAcademicaComponent, },
      { path: 'informacion-laboral', component: InformacionLaboralComponent, },
      { path: 'cargo-usuario', component: JobPositionUserComponent, },

    ]
  },

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      {
        path: 'welcome-admin',
        component: WelcomeAdminComponent
      },
      {
        path: 'profile-admin',
        component: ProfileAdminComponent
      },
      {
        path: 'view-categorias',
        component: ViewCategoriasComponent
      },
      {
        path: 'add-categoria',
        component: AddCategoriaComponent
      },
      {
        path: 'actualizar-categoria/:catId',
        component: AddCategoriaComponent
      },
      {
        path: 'view-examenes',
        component: ViewExamenesComponent
      },
      {
        path: 'view-examen-preguntas/:exam_id/:exam_titl',
        component: ViewExamenPreguntasComponent
      },
      {
        path: 'add-pregunta/:exam_id/:exam_titl',
        component: AddPreguntaComponent
      },

      {
        path: 'view-usuarios',
        component: ViewUsuariosComponent
      },
      {
        path: 'add-usuarios',
        component: AddUsuariosComponent
      },
      {
        path: 'actualizar-usuario/:usuarioId',
        component: AddUsuariosComponent
      },
      {
        path: 'view-perfil-usuario/:email',
        component: ViewPerfilUsuarioComponent
      }
    ]
  },

  {
    path: 'reclutador',
    component: DashboardRComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_REC' },
    children: [
      {
        path: 'welcome-reclutador',
        component: WelcomeReclutadorComponent
      },
      {
        path: 'profile-r',
        component: ProfileRComponent
      },
      {
        path: 'view-usuarios-r',
        component: ViewUsuariosRComponent
      },
      {
        path: 'view-perfil-usuario-r/:email',
        component: ViewPerfilUsuarioRComponent
      },

      {
        path: 'estadisticas',
        component: EstadisticasComponent
      }


    ]
  },
  {
    path: 'portal-view',
    component: PortalViewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':catId',
        component: LoadExamenComponent
      },
      {
        path: 'instrucciones/:exam_id',
        component: InstruccionesComponent
      },


    ]
  },
  {
    path: "start/:exam_id",
    component: StartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "entrevistador",
    component: DashboardEComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ENTR'] },
    children: [
      {
        path: 'welcome-entrevistador',
        component: WelcomeEntrevistadorComponent
      },
      {
        path: 'observaciones',
        component: ObservacionesComponent
      },
      {
        path: 'view-usuarios-e',
        component: ViewUsuariosComponent
      },
    ]
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
