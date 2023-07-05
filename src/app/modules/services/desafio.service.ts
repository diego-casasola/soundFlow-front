import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desafio } from 'src/app/shared/interfaces/desafio.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesafioService {
  private baseUrl: string = environment.API;

  constructor(
    private http: HttpClient,
  ) { }

  getDesafios(nivelId: number): Observable<Desafio[]> {
    const url = `${this.baseUrl}/game/desafio/${nivelId}/get-desafio-level/`;
    return this.http.get<Desafio[]>(url);
  }

  getDesafiosUser(nivelId: number): Observable<Desafio[]> {
    const url = `${this.baseUrl}/game/desafio/${nivelId}/get_desafios_habilitados_user/`;
    return this.http.get<Desafio[]>(url);
  }

  getDesafiosSuccess() {
    const url = `${this.baseUrl}/game/user_nivel/get-desafios-user/`;
    return this.http.get<any>(url);
  }
}
