import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrls: ['./status-user.component.scss']
})
export class StatusUserComponent implements OnInit {
  color: ThemePalette = 'primary';
  modeEnergia: ProgressSpinnerMode = 'determinate';

  modeXp: ProgressBarMode = 'determinate';
  maxXp: number = 2900;



  constructor(
    private authService: AuthService,
  ) { }

  get user() {
    return this.authService.currentUser
  }

  ngOnInit(): void {
    this.calcularEnergia();
    this.calcularColorEnergia();
    this.calcularPorcentajeXp();
  }

  calcularEnergia(){
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
