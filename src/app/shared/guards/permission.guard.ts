import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  redirected = false;
  get Usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLogged()) {
      return this.router.navigate(['/auth/login']).then(() => false);
    }
    return true;
  }
}
