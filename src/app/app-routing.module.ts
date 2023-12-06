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

import { ViewExamenPreguntasComponent } from './COMPONENTES/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './COMPONENTES/admin/add-pregunta/add-pregunta.component';

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
import { UserDashboardComponent } from './COMPONENTES/pages/user/user-dashboard/user-dashboard.component';
import { LoadExamenComponent } from './COMPONENTES/pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './COMPONENTES/pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './COMPONENTES/pages/user/start/start.component';
import { AddUsuariosComponent } from './COMPONENTES/admin/add-usuarios/add-usuarios.component';

import { EstadisticasComponent } from './COMPONENTES/reclutador/estadisticas/estadisticas.component';
import { DashboardEComponent } from './COMPONENTES/entrevistador/dashboard-e/dashboard-e.component';
import { WelcomeEntrevistadorComponent } from './COMPONENTES/entrevistador/welcome-entrevistador/welcome-entrevistador.component';
import { ObservacionesComponent } from './COMPONENTES/entrevistador/observaciones/observaciones.component';
import { ViewPerfilUsuarioEComponent } from './COMPONENTES/entrevistador/view-perfil-usuario-e/view-perfil-usuario-e.component';


const routes: Routes = [
  {path:'restaurar', component:RestaurarPassComponent},

  {path:'restaurar-contrasena', component:PeticionRestaurarPassComponent},

  {path:'', redirectTo:'user/datos_personales', pathMatch:'full'},
  {path:'registrar', component:RegistrarComponent},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'verificar-email', component:ValidarMailComponent},
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { role: 'ROLE_GUEST' },
    children: [
      {
        path: 'datos_personales',
        pathMatch: 'full',
        component: DatosPersonalesComponent
      },
      {path:'herramientas-tecnologias', component:HerramientasTecnologiasComponent},
      {path:'informacion-academica', component:InformacionAcademicaComponent,},
      {path:'informacion-laboral', component:InformacionLaboralComponent, },
      {path:'cargo-usuario', component:CargoUsuarioComponent,},

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
        path:'view-examen-preguntas/:exam_id/:exam_titl',
        component:ViewExamenPreguntasComponent
      },
      {
        path:'add-pregunta/:exam_id/:exam_titl',
        component:AddPreguntaComponent
      },

      {
        path:'view-usuarios',
        component:ViewUsuariosComponent
      },
      {
        path:'add-usuarios',
        component:AddUsuariosComponent
      },
      {
        path:'actualizar-usuario/:usuarioId',
        component:AddUsuariosComponent
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


    ]
  },
  {
    path:"start/:exam_id",
    component:StartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"entrevistador",
    component:DashboardEComponent,
    canActivate:[AuthGuard],
    data: { role: 'ROLE_ENTR' },
    children:[
      {
        path:'welcome-entrevistador',
        component:WelcomeEntrevistadorComponent
      },
      {
        path:'viewperfilusuarioe',
        component:ViewPerfilUsuarioEComponent
      },
      {
        path:'observaciones',
        component:ObservacionesComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
