import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/user/')) {
      // No interceptar la solicitud de registro, pasarla directamente
      return next.handle(req);
    }
    const authToken = this.authService.accessToken;

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handleUnauthorizedError(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handleUnauthorizedError(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.validarToken().pipe(
      switchMap((accessToken) => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken.access}`,
          },
        });

        if (accessToken.access) {
          this.authService.setAccessToken(accessToken.access);
        }

        return next.handle(authReq);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
