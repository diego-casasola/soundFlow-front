import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrincipalComponent } from './home/principal/principal.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class ModulesRoutingModule { }
