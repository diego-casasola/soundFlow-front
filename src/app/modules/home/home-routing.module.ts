import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelesComponent } from './game/niveles/niveles.component';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { DesafiosComponent } from './game/desafios/desafios.component';
import { Desafio1Component } from './pruebas/nivel1/desafio1/desafio1.component';
import { Desafio2Component } from './pruebas/nivel1/desafio2/desafio2.component';
import { Desafio3Component } from './pruebas/nivel1/desafio3/desafio3.component';
import { Desafio4Component } from './pruebas/nivel1/desafio4/desafio4.component';
import { Desafio5Component } from './pruebas/nivel1/desafio5/desafio5.component';
import { Desafio10Component } from './pruebas/nivel2/desafio10/desafio10.component';
import { Desafio6Component } from './pruebas/nivel2/desafio6/desafio6.component';
import { Desafio7Component } from './pruebas/nivel2/desafio7/desafio7.component';
import { Desafio8Component } from './pruebas/nivel2/desafio8/desafio8.component';
import { Desafio9Component } from './pruebas/nivel2/desafio9/desafio9.component';
import { Desafio11Component } from './pruebas/nivel3/desafio11/desafio11.component';
import { Desafio12Component } from './pruebas/nivel3/desafio12/desafio12.component';
import { Desafio13Component } from './pruebas/nivel3/desafio13/desafio13.component';
import { Desafio14Component } from './pruebas/nivel3/desafio14/desafio14.component';
import { Desafio15Component } from './pruebas/nivel3/desafio15/desafio15.component';
import { Desafio16Component } from './pruebas/nivel4/desafio16/desafio16.component';
import { Desafio17Component } from './pruebas/nivel4/desafio17/desafio17.component';
import { Desafio18Component } from './pruebas/nivel4/desafio18/desafio18.component';
import { Desafio19Component } from './pruebas/nivel4/desafio19/desafio19.component';

const routes: Routes = [
  {
    path:'niveles',
    canActivate: [PermissionGuard],
    component: NivelesComponent
  },
  {
    path:'niveles/:id/desafios',
    canActivate: [PermissionGuard],
    component: DesafiosComponent
  },
  {
    path:'niveles/:id/desafios',
    canActivate: [PermissionGuard],
    children:[
      {
        path:'19',
        component: Desafio1Component
      },
      {
        path:'20',
        component: Desafio2Component
      },
      {
        path:'21',
        component: Desafio3Component
      },
      {
        path:'22',
        component: Desafio4Component
      },
      {
        path:'23',
        component: Desafio5Component
      },
      {
        path:'24',
        component: Desafio6Component
      },
      {
        path:'25',
        component: Desafio7Component
      },
      {
        path:'26',
        component: Desafio8Component
      },
      {
        path:'27',
        component: Desafio9Component
      },
      {
        path:'28',
        component: Desafio10Component
      },
      {
        path:'29',
        component: Desafio6Component
      },
      {
        path:'30',
        component: Desafio7Component
      },
      {
        path:'31',
        component: Desafio8Component
      },
      {
        path:'32',
        component: Desafio9Component
      },
      {
        path:'33',
        component: Desafio10Component
      },
      {
        path:'34',
        component: Desafio16Component
      },
      {
        path:'35',
        component: Desafio17Component
      },
      {
        path:'36',
        component: Desafio18Component
      },
      {
        path:'37',
        component: Desafio19Component
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'niveles',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
