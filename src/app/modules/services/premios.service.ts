import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PremiosService {
  private baseUrl: string = environment.API;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTrofeoInfo(id: number) {
    const url = `${this.baseUrl}/game/trofeo/${id}/`;
    return this.httpClient.get<any>(url);
  }

  getTrofeosUser(){
    const url = `${this.baseUrl}/game/usuario_trofeos/get-trofeos-by-user/`;
    return this.httpClient.get<any>(url);
  }
}
