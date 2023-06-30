import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserResolver } from './shared/resolvers/current-user.resolver';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'home',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    resolve: {
      currentUser: CurrentUserResolver
    },
  },
  {
    path:'**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
