import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Prueba, Respuesta } from 'src/app/shared/interfaces/prueba.interface';
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

  verificarRespuestas(pruebaRes: any): Observable<any> {
    // añadir a pruebaRes la variable needEnergy
    pruebaRes.needEnergy = this.needEnergy;
    console.log(pruebaRes);
    const url = `${this.baseUrl}/game/prueba/respuesta-pruebaDesafio-user/`;
    return this.httpClient.post<any>(url, pruebaRes);
  }

  private needEnergy = false;

  setNeedEnergy(value: boolean): void {
    this.needEnergy = value;
  }

  getNeedEnergy(): boolean {
    return this.needEnergy;
  }

  resetNeedEnergy(): void {
    this.needEnergy = false;
  }
}
