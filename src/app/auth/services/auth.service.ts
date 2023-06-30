import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse, ShortUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'access';
  private readonly REFRESH_TOKEN = 'refresh';
  private readonly CURRENT_USER_ID = 'player';

  private _usuario!: ShortUser;
  private _currentUserId!: string;
  private _currentUser!: ShortUser;
  private baseUrl: string = environment.API;

  get currentUserId() {
    return this._currentUserId;
  }

  get currentUser() {
    return this._currentUser;
  }

  get usuario() {
    return { ...this._usuario };
  }

  get refreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  get accessToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }


  validarToken() {
    const url = `${this.baseUrl}/token/refresh/`;
    const body = { refresh: this.refreshToken };

    return this.http.post<AuthResponse>(url, body);
  }

  setAccessToken(access: string) {
    localStorage.setItem(this.JWT_TOKEN, access!);
  }

  isLogged() {
    return !!this.accessToken;
  }

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    if (this.accessToken) {
      const decoded = helper.decodeToken(this.accessToken!);
      if (decoded) {
        this._usuario = {
          user_id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          xp: decoded.xp,
          energia: decoded.energia,
        };
      }
    }
  }

  login(username: string, password: string) {
    const url = `${this.baseUrl}/auth/auth/token/`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((tokens) => {
        const decoded = helper.decodeToken(tokens.access);
        this.storeTokens(tokens);
        if (decoded) {
          this._usuario = {
            user_id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            xp: decoded.xp,
            energia: decoded.energia,
          };
        }
      }),
      mapTo(true),
      catchError((error) => { throw error }),
    )
  }

  registerUser(formData: any) {
    const url = `${this.baseUrl}/auth/user/`;
    return this.http.post(url, formData);
  }

  private storeTokens(tokens: AuthResponse) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access!);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh!);
  }

  private setCurrentUserId(userId: string) {
    this._currentUserId = userId;
    localStorage.setItem(this.CURRENT_USER_ID, userId);
  }

  setCurrentUser(user: any) {
    this._currentUser = user;
    this.setCurrentUserId(user.id.toString());
  }

  getUserById(id: number) {
    const url = `${this.baseUrl}/auth/user/${id}/`;
    return this.http.get<ShortUser>(url);
  }

  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }
}
