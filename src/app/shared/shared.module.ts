import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUserResolver } from './resolvers/current-user.resolver';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
})
export class SharedModule { }
