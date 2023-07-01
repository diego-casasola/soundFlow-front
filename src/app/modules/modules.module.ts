import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './home/principal/principal.component';
import { StatusUserComponent } from './home/components/status-user/status-user.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    StatusUserComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
  ]
})
export class ModulesModule { }
