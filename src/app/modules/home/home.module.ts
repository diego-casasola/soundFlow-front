import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NivelesComponent } from './game/niveles/niveles.component';
import { DesafiosComponent } from './game/desafios/desafios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardNivelComponent } from './components/card-nivel/card-nivel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShownivelComponent } from './game/shownivel/shownivel.component';
import { StatusUserComponent } from './components/status-user/status-user.component';
import { CardDesafioComponent } from './components/card-desafio/card-desafio.component';
import { Desafio1Component } from './pruebas/nivel1/desafio1/desafio1.component';
import { Desafio2Component } from './pruebas/nivel1/desafio2/desafio2.component';
import { Desafio3Component } from './pruebas/nivel1/desafio3/desafio3.component';
import { Desafio4Component } from './pruebas/nivel1/desafio4/desafio4.component';
import { Desafio5Component } from './pruebas/nivel1/desafio5/desafio5.component';
import { Desafio6Component } from './pruebas/nivel2/desafio6/desafio6.component';
import { Desafio7Component } from './pruebas/nivel2/desafio7/desafio7.component';
import { Desafio8Component } from './pruebas/nivel2/desafio8/desafio8.component';
import { Desafio9Component } from './pruebas/nivel2/desafio9/desafio9.component';
import { Desafio10Component } from './pruebas/nivel2/desafio10/desafio10.component';
import { Desafio11Component } from './pruebas/nivel3/desafio11/desafio11.component';
import { Desafio12Component } from './pruebas/nivel3/desafio12/desafio12.component';
import { Desafio13Component } from './pruebas/nivel3/desafio13/desafio13.component';
import { Desafio14Component } from './pruebas/nivel3/desafio14/desafio14.component';
import { Desafio15Component } from './pruebas/nivel3/desafio15/desafio15.component';
import { Desafio16Component } from './pruebas/nivel4/desafio16/desafio16.component';
import { Desafio17Component } from './pruebas/nivel4/desafio17/desafio17.component';
import { Desafio18Component } from './pruebas/nivel4/desafio18/desafio18.component';
import { Desafio19Component } from './pruebas/nivel4/desafio19/desafio19.component';


@NgModule({
  declarations: [
    NivelesComponent,
    DesafiosComponent,
    CardNivelComponent,
    ShownivelComponent,
    CardDesafioComponent,
    Desafio1Component,
    Desafio2Component,
    Desafio3Component,
    Desafio4Component,
    Desafio5Component,
    Desafio6Component,
    Desafio7Component,
    Desafio8Component,
    Desafio9Component,
    Desafio10Component,
    Desafio11Component,
    Desafio12Component,
    Desafio13Component,
    Desafio14Component,
    Desafio15Component,
    Desafio16Component,
    Desafio17Component,
    Desafio18Component,
    Desafio19Component,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
