import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelesComponent } from './game/niveles/niveles.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { DesafiosComponent } from './game/desafios/desafios.component';
import { ShownivelComponent } from './game/shownivel/shownivel.component';
import { PruebasModule } from '../pruebas/pruebas.module';

const routes: Routes = [
  {
    path:'niveles',
    canActivate: [PermissionGuard],
    component: NivelesComponent
  },
  {
    path:'niveles/:id',
    canActivate: [PermissionGuard],
    component: ShownivelComponent
  },
  {
    path:'niveles/:id/desafios',
    canActivate: [PermissionGuard],
    component: DesafiosComponent
  },
  {
    path:'niveles/:id/desafios/:id',
    canActivate: [PermissionGuard],
    loadChildren: () => import('../pruebas/pruebas.module').then(m => m.PruebasModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
