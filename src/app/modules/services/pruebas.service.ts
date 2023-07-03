import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prueba } from 'src/app/shared/interfaces/prueba.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  private baseUrl: string = environment.API;

  constructor(
    private httpClient: HttpClient
  ) { }

  getPruebas(id: number): Observable<Prueba[]> {
    const url = `${this.baseUrl}/game/prueba/${id}/get-pruebas-desafio/`;
    return this.httpClient.get<Prueba[]>(url);
  }
}
