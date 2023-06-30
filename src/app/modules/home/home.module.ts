import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NivelesComponent } from './game/niveles/niveles.component';
import { DesafiosComponent } from './game/desafios/desafios.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NivelesComponent,
    DesafiosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
