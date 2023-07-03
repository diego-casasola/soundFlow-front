import { Component, OnChanges, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

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



  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }

  get user() {
    return this.authService.currentUser
  }

  ngOnInit(): void {
    this.calcularEnergia();
    this.calcularColorEnergia();
    this.calcularPorcentajeXp();

  }

  ngOnChanges(): void {

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
