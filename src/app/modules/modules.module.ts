import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule
  ]
})
export class ModulesModule { }
