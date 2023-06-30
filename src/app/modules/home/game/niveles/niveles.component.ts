import { Component, OnInit } from '@angular/core';
import { NivelService } from 'src/app/modules/services/nivel.service';
import { Nivel } from 'src/app/shared/interfaces/nivel.interface';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss']
})
export class NivelesComponent implements OnInit {
  niveles: Nivel[] = [];
  nivelesUser: Nivel[] = [];

  constructor(
    private nivelService: NivelService,
  ) { }

  ngOnInit(): void {
    this.getNiveles();
  }

  getNiveles() {
    this.nivelService.getNiveles().subscribe(niveles => {
      this.niveles = niveles;
    });
    this.nivelService.getNivelesUser().subscribe(nivelesUser => {
      this.nivelesUser = nivelesUser;
    });
  }
}
