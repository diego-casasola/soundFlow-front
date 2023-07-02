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


@NgModule({
  declarations: [
    NivelesComponent,
    DesafiosComponent,
    CardNivelComponent,
    ShownivelComponent,
    CardDesafioComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
