import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelesComponent } from './game/niveles/niveles.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { DesafiosComponent } from './game/desafios/desafios.component';

const routes: Routes = [
  {
    path:'niveles',
    canActivate: [PermissionGuard],
    component: NivelesComponent
  },
  {
    path:'niveles/desafios/:id',
    canActivate: [PermissionGuard],
    component: DesafiosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
