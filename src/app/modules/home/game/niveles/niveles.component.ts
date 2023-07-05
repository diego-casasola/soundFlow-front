import { Component, OnInit } from '@angular/core';
import { NivelService } from 'src/app/modules/services/nivel.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { Nivel, NivelUser } from 'src/app/shared/interfaces/nivel.interface';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss']
})
export class NivelesComponent implements OnInit {
  niveles: Nivel[] = [];
  nivelesUser: Nivel[] = [];
  levels: NivelUser[] = [];

  constructor(private nivelService: NivelService, 
    private pruebasService: PruebasService,
    ) { }

  async ngOnInit(): Promise<void> {
    this.pruebasService.resetNeedEnergy();
    await this.getNiveles();
    await this.getNivelesUser();
    if (this.niveles.length > 0 && this.nivelesUser.length > 0) {
      this.verificarNivelesHabilitados();
    }
  }
  async getNiveles(): Promise<void> {
    try {
      const res: Nivel[] = await this.nivelService.getNiveles().toPromise();
      this.niveles = res;
    } catch (err) {
      console.log(err);
    }
  }
  
  async getNivelesUser(): Promise<void> {
    try {
      const res: Nivel[] = await this.nivelService.getNivelesUser().toPromise();
      this.nivelesUser = res;
    } catch (err) {
      console.log(err);
    }
  }

  verificarNivelesHabilitados() {
    this.niveles.forEach(nivel => {
      let habilitado = false;
      this.nivelesUser.forEach(nivelUser => {
        if (nivel.id == nivelUser.id) {
          habilitado = true;
        }
      });
      this.levels.push({
        id: nivel.id,
        nombre: nivel.nombre,
        descripcion: nivel.descripcion,
        nivel: nivel.nivel,
        imagen: nivel.imagen,
        habilitado: habilitado
      });
    });
  }
}
