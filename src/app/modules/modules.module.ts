import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './home/principal/principal.component';
import { StatusUserComponent } from './home/components/status-user/status-user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor/auth.interceptor';
import { DragDropModule } from '@angular/cdk/drag-drop';


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
    DragDropModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class ModulesModule { }
