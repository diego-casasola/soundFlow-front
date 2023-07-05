import { Component, OnChanges, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DesafioService } from 'src/app/modules/services/desafio.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';

@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrls: ['./status-user.component.scss']
})
export class StatusUserComponent implements OnInit, OnChanges {
  color: ThemePalette = 'primary';
  modeEnergia: ProgressSpinnerMode = 'determinate';

  modeXp: ProgressBarMode = 'determinate';
  maxXp: number = 2900;
  challengesList: any[] = [];



  constructor(
    private authService: AuthService,
    private route: Router,
    private desafioService: DesafioService,
    private pruebasService: PruebasService,
  ) { }

  get user() {
    return this.authService.currentUser
  }

  ngOnInit(): void {
    this.calcularEnergia();
    this.calcularColorEnergia();
    this.calcularPorcentajeXp();
    this.getDesafiosSuccess();
    this.pruebasService.resetNeedEnergy();
  }

  ngOnChanges(): void {
    
  }

  getDesafiosSuccess() {
    this.desafioService.getDesafiosSuccess().subscribe(
      (res) => {
        this.challengesList = res.desafios;
        console.log(this.challengesList);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  regenerateEnergia() {
    const randomIndex = Math.floor(Math.random() * this.challengesList.length);
    const challengeId = this.challengesList[randomIndex];

    this.pruebasService.setNeedEnergy(true);

    this.route.navigate([`/home/niveles/${challengeId.nivel_id}/desafios/${challengeId.desafio_id}`]);
  }

  calcularEnergia() {
    if (this.user) {
      const energia = this.user.energia;
      const energiaMax = 20;
      const porcentaje = (energia * 100) / energiaMax;
      return porcentaje;
    }
    return 0;
  }

  calcularColorEnergia(): string {
    const energia = this.calcularEnergia();
    return energia <= 25 ? 'warn' : 'primary';
  }

  calcularPorcentajeXp(): string {
    const porcentaje = (this.user.xp / this.maxXp) * 100;
    return `${porcentaje}%`;
  }

}
