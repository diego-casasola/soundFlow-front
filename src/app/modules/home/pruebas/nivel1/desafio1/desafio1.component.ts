import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PruebasService } from 'src/app/modules/services/pruebas.service';

@Component({
  selector: 'app-desafio1',
  templateUrl: './desafio1.component.html',
  styleUrls: ['./desafio1.component.scss']
})
export class Desafio1Component implements OnInit {
  desafioId = this.route.url.split('/')[5];

  constructor(
    private pruebasService: PruebasService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.desafioId);
  }

  

}
