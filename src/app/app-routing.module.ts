import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './COMPONENTES/registrar/registrar.component';
import { IniciarSesionComponent } from './COMPONENTES/iniciar-sesion/iniciar-sesion.component';
import { DashboardComponent } from './COMPONENTES/admin/dashboard/dashboard.component';
import { WelcomeAdminComponent } from './COMPONENTES/admin/welcome-admin/welcome-admin.component';
import { ProfileAdminComponent } from './COMPONENTES/admin/profile-admin/profile-admin.component';
import { ViewCategoriasComponent } from './COMPONENTES/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './COMPONENTES/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './COMPONENTES/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './COMPONENTES/admin/add-examen/add-examen.component';
import { ActualizarCategoriaComponent } from './COMPONENTES/admin/actualizar-categoria/actualizar-categoria.component';
import { ActualizarExamenComponent } from './COMPONENTES/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './COMPONENTES/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './COMPONENTES/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './COMPONENTES/admin/actualizar-pregunta/actualizar-pregunta.component';
import { ViewUsuariosComponent } from './COMPONENTES/admin/view-usuarios/view-usuarios.component';
import { ViewPerfilUsuarioComponent } from './COMPONENTES/admin/view-perfil-usuario/view-perfil-usuario.component';
import { DashboardRComponent } from './COMPONENTES/reclutador/dashboard-r/dashboard-r.component';
import { WelcomeReclutadorComponent } from './COMPONENTES/reclutador/welcome-reclutador/welcome-reclutador.component';
import { ProfileRComponent } from './COMPONENTES/reclutador/profile-r/profile-r.component';
import { ViewUsuariosRComponent } from './COMPONENTES/reclutador/view-usuarios-r/view-usuarios-r.component';
import { ViewPerfilUsuarioRComponent } from './COMPONENTES/reclutador/view-perfil-usuario-r/view-perfil-usuario-r.component';
import { DatosPersonalesComponent } from './COMPONENTES/datos-personales/datos-personales.component';
import { HerramientasTecnologiasComponent } from './COMPONENTES/herramientas-tecnologias/herramientas-tecnologias.component';
import { InformacionAcademicaComponent } from './COMPONENTES/informacion-academica/informacion-academica.component';
import { InformacionLaboralComponent } from './COMPONENTES/informacion-laboral/informacion-laboral.component';
import { CargoUsuarioComponent } from './COMPONENTES/cargo-usuario/cargo-usuario.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ValidarMailComponent } from './COMPONENTES/validar-mail/validar-mail.component';
import { PeticionRestaurarPassComponent } from './COMPONENTES/peticion-restaurar-pass/peticion-restaurar-pass.component';
import { RestaurarPassComponent } from './COMPONENTES/restaurar-pass/restaurar-pass.component';
import { ProfileComponent } from './COMPONENTES/pages/profile/profile.component';
import { WelcomeComponent } from './COMPONENTES/pages/admin/welcome/welcome.component';
import { UserDashboardComponent } from './COMPONENTES/pages/user/user-dashboard/user-dashboard.component';
import { LoadExamenComponent } from './COMPONENTES/pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './COMPONENTES/pages/user/instrucciones/instrucciones.component';
import { UserProfileComponent } from './COMPONENTES/pages/user-profile/user-profile.component';
import { StartComponent } from './COMPONENTES/pages/user/start/start.component';
import { EstadisticasComponent } from './COMPONENTES/reclutador/estadisticas/estadisticas.component';


const routes: Routes = [
  {path:'restaurar', component:RestaurarPassComponent},

  {path:'restaurar-contrasena', component:PeticionRestaurarPassComponent},

  {path:'', redirectTo:'datos_personales', pathMatch:'full'},
  {path:'registrar', component:RegistrarComponent},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'verificar-email', component:ValidarMailComponent},
  {path:'datos_personales', component:DatosPersonalesComponent, canActivate: [AuthGuard]},
  {path:'herramientas-tecnologias', component:HerramientasTecnologiasComponent, canActivate: [AuthGuard]},
  {path:'informacion-academica', component:InformacionAcademicaComponent, canActivate: [AuthGuard]},
  {path:'informacion-laboral', component:InformacionLaboralComponent, canActivate: [AuthGuard]},
  {path:'cargo-usuario', component:CargoUsuarioComponent, canActivate: [AuthGuard]},

  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { role: 'ROLE_GUEST' },
    children: [
      {
        path: 'datos_personales',
        pathMatch: 'full',
        component: DatosPersonalesComponent
      }
    ]
  },

  {
    path:'admin',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children:[
      {
        path:'welcome-admin',
        component:WelcomeAdminComponent
      },
      {
        path:'profile-admin',
        component:ProfileAdminComponent
      },
      {
        path:'view-categorias',
        component:ViewCategoriasComponent
      },
      {
        path:'add-categoria',
        component:AddCategoriaComponent
      },
      {
        path:'actualizar-categoria/:catId',
        component:AddCategoriaComponent
      },
      {
        path:'view-examenes',
        component:ViewExamenesComponent
      },
      {
        path:'add-examen',
        component:AddExamenComponent
      },
      {
        path:'actualizar-examen/:exam_id',
        component:ActualizarExamenComponent
      },
      {
        path:'view-examen-preguntas/:exam_id/:exam_titl',
        component:ViewExamenPreguntasComponent
      },
      {
        path:'add-pregunta/:exam_id/:exam_titl',
        component:AddPreguntaComponent
      },
      {
        path:'actualizar-pregunta/:prg_id',
        component:ActualizarPreguntaComponent
      },
      {
        path:'view-usuarios',
        component:ViewUsuariosComponent
      },
      {
        path:'view-perfil-usuario/:email',
        component:ViewPerfilUsuarioComponent
      }
    ]
  },

  {
    path:'reclutador',
    component:DashboardRComponent,
    canActivate:[AuthGuard],
    data: { role: 'ROLE_REC' },
    children:[
      {
        path:'welcome-reclutador',
        component:WelcomeReclutadorComponent
      },
      {
        path:'profile-r',
        component:ProfileRComponent
      },
      {
        path:'view-usuarios-r',
        component:ViewUsuariosRComponent
      },
      {
        path:'view-perfil-usuario-r/:email',
        component:ViewPerfilUsuarioRComponent
      },

      {
        path:'estadisticas',
        component:EstadisticasComponent
      }


    ]
  },
  {
    path:'admin-examen',
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'categorias',
        component: ViewCategoriasComponent
      },
      {
        path:'add-categoria',
        component:AddCategoriaComponent
      },
      {
        path:'examenes',
        component:ViewExamenesComponent
      },
      {
        path:'add-examen',
        component:AddExamenComponent
      },
      {
        path:'examen/:examenId',
        component:ActualizarExamenComponent
      },
      {
        path:'ver-preguntas/:examenId/:titulo',
        component:ViewExamenPreguntasComponent
      },
      {
        path:'add-pregunta/:examenId/:titulo',
        component:AddPreguntaComponent
      },
      {
        path:'pregunta/:preguntaId',
        component:ActualizarPreguntaComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[AuthGuard],
    children : [
      {
        path:':catId',
        component:LoadExamenComponent
      },
      {
        path:'instrucciones/:exam_id',
        component:InstruccionesComponent
      },
      {
        path:'user-profile',
        component:UserProfileComponent
      },

    ]
  },
  {
    path:"start/:examenId",
    component:StartComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
