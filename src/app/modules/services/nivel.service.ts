import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nivel } from 'src/app/shared/interfaces/nivel.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private baseUrl: string = environment.API;

  constructor(
    private httpClient: HttpClient
  ) { }

  getNiveles() {
    const url = `${this.baseUrl}/game/nivel/`;
    return this.httpClient.get<Nivel[]>(url);
  }

  getNivelesUser(){
    const url = `${this.baseUrl}/game/nivel/get_niveles_habilitados_user/`;
    return this.httpClient.get<Nivel[]>(url);
  }
}
