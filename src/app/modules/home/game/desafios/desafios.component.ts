import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DesafioService } from 'src/app/modules/services/desafio.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { Desafio, DesafioUser } from 'src/app/shared/interfaces/desafio.interface';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.scss']
})
export class DesafiosComponent implements OnInit {
  nivelId: number = 0;
  desafios: Desafio[] = [];
  desafiosUser: Desafio[] = [];
  challenges: DesafioUser[] = [];

  constructor(
    private desafioService: DesafioService,
    private activatedRoute: ActivatedRoute,
    private pruebasService: PruebasService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.pruebasService.resetNeedEnergy();
    this.nivelId = this.activatedRoute.snapshot.params.id;
    await this.getDesafios();
    await this.getDesafiosUser();
    if (this.desafios.length > 0 && this.desafiosUser.length > 0) {
      this.verificarDesafiosHabilitados();
      console.log(this.challenges);
    } 
  }

  async getDesafios(): Promise<void> {
    try {
      const res = await this.desafioService.getDesafios(this.nivelId).toPromise();
      this.desafios = res;
    } catch (err) {
      console.log(err);
    }
  }

  async getDesafiosUser(): Promise<void> {
    try {
      const res = await this.desafioService.getDesafiosUser(this.nivelId).toPromise();
      this.desafiosUser = res;
    } catch (err) {
      console.log(err);
    }
  }

  verificarDesafiosHabilitados() {
    this.desafios.forEach(desafio => {
      let habilitado = false;
      this.desafiosUser.forEach(desafioUser => {
        if (desafio.id == desafioUser.id) {
          habilitado = true;
        }
      });
      this.challenges.push({
        id: desafio.id,
        nombre: desafio.nombre,
        min_energia: desafio.min_energia,
        nivel: desafio.nivel,
        habilitado: habilitado
      });
    });
  }
}
