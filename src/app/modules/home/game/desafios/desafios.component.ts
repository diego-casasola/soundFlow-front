import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DesafioService } from 'src/app/modules/services/desafio.service';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.scss']
})
export class DesafiosComponent implements OnInit {
  nivelId: number = 0;

  constructor(
    private desafioService: DesafioService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.nivelId = this.activatedRoute.snapshot.params.id;
    await this.getDesafios();
  }

  async getDesafios(): Promise<void> {
    try {
      const res = await this.desafioService.getDesafios(this.nivelId).toPromise();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
