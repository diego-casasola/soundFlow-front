import { Component, Input, OnInit } from '@angular/core';
import { NivelUser } from 'src/app/shared/interfaces/nivel.interface';

@Component({
  selector: 'app-card-nivel',
  templateUrl: './card-nivel.component.html',
  styleUrls: ['./card-nivel.component.scss']
})
export class CardNivelComponent implements OnInit {
  @Input('level') nivel!: NivelUser;  

  constructor() { }

  ngOnInit(): void {
  }

}
